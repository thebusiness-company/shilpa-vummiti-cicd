// Wishlist.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, deleteWishlistItem, addToCart } from "../../hooks/wishlistApi";
import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { RiShoppingBag4Line } from "react-icons/ri";
import { API_URL } from "../../api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

const Wishlist = () => {
  const queryClient = useQueryClient();

  // Ensure cart_code exists
  useEffect(() => {
    let code = localStorage.getItem("cart_code");
    if (!code) {
      code = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("cart_code", code);
    }
  }, []);

  const cartCode = localStorage.getItem("cart_code");

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Added to cart successfully!");
    },
    onError: (error) => {
      if (error?.response?.data?.detail === "Already in cart") {
        toast.error("Already in cart!");
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const removeFromWishlist = (productId) => {
    deleteMutation.mutate(productId);
  };

  const handleAddToCart = (productId) => {
    if (!cartCode) return;
    addToCartMutation.mutate({ productId, cartCode });
  };

  if (isLoading) return <Loader text="Loading Wishlist" />;

  return (
    <div className="w-full max-w-[96%] md:max-w-[94%] mx-auto min-h-screen flex flex-col items-center px-4 py-8 bg-white">
      <h2 className="text-lg md:text-xl lg:text-2xl font-medium mb-8 text-center mt-6">
        Don’t lose your favorites anymore
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {wishlist.map(({ id, product }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative group bg-white overflow-hidden transition-shadow"
            >
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 z-10 text-gray-500 lg:text-white lg:group-hover:text-gray-500 cursor-pointer transition-colors ease-in-out duration-200"
              >
                <X size={18} />
              </button>

              <div
                onClick={() => handleAddToCart(product.id)}
                className="absolute bottom-2 right-[-2px] z-10"
              >
                <div className="relative w-10 h-10 group-hover:w-[110px] transition-all duration-300 overflow-hidden group-hover:bg-white rounded-full flex items-center justify-center px-2 cursor-pointer">
                  <RiShoppingBag4Line
                    className="text-gray-500 group-hover:opacity-0 transition-opacity duration-300"
                    size={22}
                  />
                  <div className="absolute right-2 opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-all duration-300 translate-x-10 group-hover:translate-x-0">
                    <span className="text-xs mb-0.5 text-gray-800">
                      Add to Cart
                    </span>
                    <ArrowRight size={14} className="text-black" />
                  </div>
                </div>
              </div>
              <div className="relative w-full h-[200px] md:h-[350px] lg:h-[480px] overflow-hidden">
                <img
                  src={`${API_URL}${product.image}` || "/fallback-image.png"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="py-3">
                <h3 className="text-sm md:text-lg font-medium pr-10 text-[#183028] font-tenor">
                  {product.name}
                </h3>
                <p className="text-base md:text-xl md:mt-2 text-[#183028]">
                  ₹ {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
