import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { HiMiniPlus } from "react-icons/hi2";
import { FiMinus } from "react-icons/fi";
import API, { API_URL } from "../../api";
import { getProductBySlug } from "../../hooks/useProducts";
import { addToWishlist, deleteWishlistItem } from "../../hooks/wishlistApi";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

// Reusable Accordion
function Accordion({ title, expanded, onToggle, children }) {
  return (
    <div
      className="border-b border-[#4C4C4C] py-3 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm md:text-base lg:text-lg font-medium">
          {title}
        </span>
        {expanded ? <FiMinus /> : <HiMiniPlus />}
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm  mt-4 mb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetail({ setNumCartItems }) {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [expanded, setExpanded] = useState({
    care: false,
    size: false,
    gift: false,
  });
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const cart_code = localStorage.getItem("cart_code");

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: getProductBySlug,
    enabled: !!slug,
  });

  const sizeData = [
    { size: "S", bust: 34, waist: 28, hip: 36 },
    { size: "M", bust: 36, waist: 30, hip: 38 },
    { size: "L", bust: 38, waist: 32, hip: 40 },
    { size: "XL", bust: 40, waist: 34, hip: 42 },
  ];

  const availableSizes = product?.sizes || [];

  useEffect(() => {
    if (product) {
      try {
        const imageList = product.images?.map((img) => img.images) || [];
        setSelectedImage(imageList[0] || product.image);
      } catch (err) {
        console.error("Error setting product image:", err);
      }
    }
  }, [product]);

  const toggle = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // --- Add to Cart Mutation ---
  const mutation = useMutation({
    mutationFn: async ({ cart_code, product_id }) => {
      try {
        return await API.post("cart-items/", {
          cart_code,
          product_id,
          selectedSize,
        });
      } catch (err) {
        console.error("Error adding to cart:", err);
        throw err;
      }
    },
    onSuccess: () => {
      toast.success("Item added to cart!");
      setInCart(true);
      setNumCartItems((curr) => curr + 1);
    },
    onError: () => toast.error("Failed to add item to cart."),
  });

  const handleAddToBag = () => {
  try {
    if (!product) {
      toast.error("Product details not available.");
      return;
    }

    // ✅ Only require size if sizes exist
    if (availableSizes.length > 0 && !selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    if (!cart_code) {
      toast.error("Cart session not found. Please refresh or try again.");
      return;
    }

    mutation.mutate({ cart_code, product_id: product.id });
  } catch (err) {
    console.error("Error adding product to cart:", err);
    toast.error("Something went wrong while adding to cart.");
  }
};

  // --- Wishlist Mutations ---
  const addWishlistMutation = useMutation({
    mutationFn: async (productId) => {
      try {
        return await addToWishlist(productId);
      } catch (err) {
        console.error("Error adding to wishlist:", err);
        throw err;
      }
    },
    onSuccess: () => {
      setInWishlist(true);
      toast.success("Added to wishlist!");
    },
    onError: () => toast.error("Failed to add to wishlist."),
  });

  const removeWishlistMutation = useMutation({
    mutationFn: async (productId) => {
      try {
        return await deleteWishlistItem(productId);
      } catch (err) {
        console.error("Error removing wishlist item:", err);
        throw err;
      }
    },
    onSuccess: () => {
      setInWishlist(false);
      toast.success("Removed from wishlist.");
    },
    onError: () => toast.error("Failed to remove from wishlist."),
  });

  const handleWishlistToggle = () => {
    try {
      if (!product?.id) return;
      if (inWishlist) {
        removeWishlistMutation.mutate(product.id);
      } else {
        addWishlistMutation.mutate(product.id);
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
      toast.error("Something went wrong while updating wishlist.");
    }
  };

  // --- Check Cart + Wishlist Status ---
  useEffect(() => {
    const fetchCartAndWishlistStatus = async () => {
      if (product?.id && cart_code) {
        try {
          const res = await API.get(
            `product_in_cart?cart_code=${cart_code}&product_id=${product.id}&product_size=${selectedSize}`
          );
          setInCart(res.data.product_in_cart);
        } catch (err) {
          console.error("Error checking product in cart:", err.message);
        }
      }

      if (product?.id && cart_code) {
        try {
          const res = await API.get(`/wishlist/?cart_code=${cart_code}`);
          const isInWishlist = res.data.some(
            (item) => item.product.id === product.id
          );
          setInWishlist(isInWishlist);
        } catch (err) {
          console.error("Error fetching wishlist:", err.message);
        }
      }
    };

    fetchCartAndWishlistStatus();
  }, [product?.id, cart_code, selectedSize]);

  if (isLoading) return <Loader />;
  if (error) return <Loader text="Error Load To Products" />;

  const imageList = product.images?.map((img) => img.images) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-white md:py-14 lg:py-20 lg:max-w-[90%] lg:mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-6 lg:gap-20 overflow-x-hidden">
        {/* Left - Image */}
        <div className="w-full md:w-1/2 ">
          <motion.img
            key={selectedImage}
            src={`${API_URL}${selectedImage}`}
            alt={product.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full object-cover lg:object-contain h-[450px] lg:h-screen lg:max-h-[700px]"
          />
        </div>

        {/* Right - Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full md:w-1/2 px-4 sm:px-6 max-w-[90%] md:max-w-full mx-auto lg:mx-0 lg:mt-8 space-y-6"
        >
          {/* Mobile Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {[product.image, ...imageList].map((img, idx) => (
              <motion.img
                key={idx}
                src={`${API_URL}${img}`}
                onClick={() => setSelectedImage(img)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-20 border ${
                  selectedImage === img ? "border-black" : "border-gray-300"
                } cursor-pointer`}
                alt={`${product.name}-thumbnail-${idx}`}
              />
            ))}
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold capitalize">
                {product.name}
              </h1>
              <p className="text-lg mt-1 font-tenor">₹ {product.price}</p>
            </div>
            <button onClick={handleWishlistToggle}>
              <Heart
                className={`w-6 h-6 mt-2 transition cursor-pointer ${
                  inWishlist
                    ? "fill-[#DB2969] stroke-[#DB2969]"
                    : "stroke-black"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-xs">(MRP incl. of all taxes)</p>
            <p className="text-sm font-palanquin">
              Product Code: {product.product_code}
            </p>
          </div>

          {/* Desktop Thumbnails */}
          <div className="hidden lg:flex gap-2 justify-between overflow-x-auto pb-2">
            {[product.image, ...imageList].map((img, idx) => (
              <motion.img
                key={idx}
                src={`${API_URL}${img}`}
                onClick={() => setSelectedImage(img)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-24 h-32 border ${
                  selectedImage === img ? "border-black" : "border-gray-300"
                } cursor-pointer`}
                alt={`${product.name}-thumbnail-${idx}`}
              />
            ))}
          </div>

          {/* Size Selector */}
          <div>
            {availableSizes.length > 0 ? (
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border px-4 py-1.5 lg:my-3 w-full cursor-pointer text-base font-semibold lg:text-base text-black hover:bg-[#F2F0EF] focus:outline-none"
              >
                <option value="">Select size</option>
                {availableSizes.map((s, idx) => (
                  <option key={s.id || idx} value={s.size}>
                    {s.size}
                  </option>
                ))}
              </select>
            ) : (
              <div className="border px-4 py-1.5 lg:my-3 w-full bg-gray-50 text-center text-base font-medium text-gray-500 cursor-not-allowed">
                No size available
              </div>
            )}
          </div>

          {/* Description */}
          <div className="text-sm leading-relaxed mt-2">
            <p className="mb-4">
              Our Digital Concierge is available for any questions about this
              product. Contact us.
            </p>
            {product.description?.split(/\r?\n/).map(
              (line, index) =>
                line.trim() !== "" && (
                  <p
                    key={index}
                    className={`leading-relaxed ${index !== 0 ? "mt-2.5" : ""}`}
                  >
                    {line}
                  </p>
                )
            )}
          </div>

          {/* Accordions */}
          <Accordion
            title="Product care"
            expanded={expanded.care}
            onToggle={() => toggle("care")}
          >
            <ul className="list-inside list-disc space-y-3 mt-2 small-bullet">
              <li>Dry clean delicate fabrics like silk and georgette.</li>
              <li>
                Hand wash sustainable fabrics in cold water with mild detergent.
              </li>
              <li>Air dry away from direct sunlight; avoid machine drying.</li>
              <li>Steam or iron on low heat using a protective cloth</li>
            </ul>
            <p className="mt-4 text-sm">
              For detailed care tips, visit our{" "}
              <Link
                to={"/care"}
                className="text-[#DB2961] underline lg:no-underline lg:hover:underline transition-colors"
              >
                Product Care
              </Link>{" "}
              page.
            </p>
          </Accordion>

          <Accordion
            title="Size guide"
            expanded={expanded.size}
            onToggle={() => toggle("size")}
          >
            <p className="mb-4">
              At Shilpa Vummiti, our garments are tailored for a refined and
              comfortable fit.
            </p>
            <table className="w-full border border-gray-300 text-sm md:text-base mb-4 max-w-[90%] mx-auto">
              <thead className="bg-[#183028] text-white">
                <tr>
                  <th className="border border-gray-300 px-2 py-1.5">Size</th>
                  <th className="border border-gray-300 px-2 py-1.5">Bust</th>
                  <th className="border border-gray-300 px-2 py-1.5">Waist</th>
                  <th className="border border-gray-300 px-2 py-1.5">Hip</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 px-2 py-1.5">
                      {row.size}
                    </td>
                    <td className="border border-gray-300 px-2 py-1.5">
                      {row.bust}
                    </td>
                    <td className="border border-gray-300 px-2 py-1.5">
                      {row.waist}
                    </td>
                    <td className="border border-gray-300 px-2 py-1.5">
                      {row.hip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section className="space-y-4 mb-4">
              <p>Fit Tips:</p>
              <ul className="list-inside list-disc space-y-3 small-bullet">
                <li>Sizes follow standard measurements.</li>
                <li>For a relaxed fit, choose one size up.</li>
                <li>Custom sizing available upon request.</li>
              </ul>
            </section>
            <span>
              Note: Fit may vary slightly by fabric, silhouette, or category.
            </span>
          </Accordion>

          {/* Add to Bag */}
          <div className="mt-8 flex justify-center">
            <motion.button
              onClick={handleAddToBag}
              disabled={inCart || mutation.isLoading}
              whileTap={{ scale: 0.95 }}
              className={`bg-[#DB2961]/20 hover:bg-[#183028]/40 text-[#DB2961] hover:text-white font-medium transition py-3 px-10 text-lg lg:text-xl 2xl:text-2xl my-4 
                ${
                  inCart || mutation.isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
            >
              {inCart
                ? "Added to bag"
                : mutation.isLoading
                ? "Adding..."
                : "Add to bag"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
