import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {motion, AnimatePresence } from "framer-motion";
import { HiMiniPlus } from "react-icons/hi2";
import { FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import API, { API_URL } from "../../api";
import { addToWishlist } from "../../hooks/wishlistApi";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";
import img from '../../assets/images/orderdetails.png'
import logo from '../../assets/images/Logo.png'
import { X } from "lucide-react";
import { Heart } from "lucide-react";
import { useRef } from "react";

// Fetch cart items from backend using stored cart code
const fetchCartItems = async () => {
  const cartCode = localStorage.getItem("cart_code");
  try {
    const response = await API.get(`cart-items/?cart_code=${cartCode}`);
    return response.data.data;
  } catch (error) {
    if (error.response.status === 404) {
      return [];
    }
    console.log("Cart Error: ", error);
    throw error;
  }
};

const CartPage = ({setNumCartItems}) => {
  const [expanded, setExpanded] = useState({ view: false });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const access = localStorage.getItem("access");
  const formRef = useRef(null);

  const [address, setAddress] = useState({
    orderedname: "",
    email: "",
    phone: "",
    address_line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: ""
  });

  // Fetch cart items query
  const { data: cartItems = [], isLoading, error } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });
  console.log("Cart Items:", cartItems);
  

  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: async (itemId) => {
      await API.delete(`cart-items/${itemId}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
      setNumCartItems(curr=>curr-1)
    },
  });

  // Update quantity mutation
  const updateItemMutation = useMutation({
    mutationFn: async ({ id, quantity, product_size }) => {
      await API.patch(`cart-items/${id}/`, { quantity, product_size });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: (productId) => addToWishlist(productId),
    onSuccess: (_, productId) => {
      const item = cartItems.find((item) => item.product.id === productId);
      if (item) {
        removeItemMutation.mutate(item.id);
      }
      queryClient.invalidateQueries(["wishlist"]);
      toast.success("Moved to wishlist");
    },
  });

  // Toggle expand view for order details
  const toggle = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculate subtotal, tax, total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  const shippingCharge = 300;
  const tax = subtotal * 0.05;

  const isShippingFree = subtotal > 10000;
  const shipping = isShippingFree? 0 : shippingCharge; 

  const total = subtotal + tax + shipping;

  const handleProcessPayment =()=>{
    if(!access){
      console.log("qqqqqqqqq")
      toast.error("Please Login before proceeding to payment");
      navigate("/login");
    }
    else{
      console.log("aaaaaaaaaaaaa")
      setShowAddressForm(true);
    }
  }

  const handleCheckout = async () => {
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    try {
      // 1. Create order in backend
      const response = await API.post('create-order/', {
        cart_code: localStorage.getItem("cart_code"),
        amount: Math.round(total * 100) // Convert to paise
      });

      const { order_id, amount, razorpay_key } = response.data;
      console.log("ssssssss","order_id",order_id, "amount",amount, "razorpay_key",razorpay_key);

      // 2. Open Razorpay checkout
      const options = {
        key: razorpay_key || import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "Shilpa vummiti",
        description: "Order Payment",
        order_id: order_id,
        handler: async function(response) {
          try {
            const verifyResponse = await API.post('verify-payment/', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              cart_code: localStorage.getItem("cart_code"),
              address: address
            });
            console.log("Payment verification response:", verifyResponse.data);

            toast.success("Payment successful! Order created.");
            localStorage.removeItem("cart_code")
            navigate(`/order-confirmation/${verifyResponse.data.order_id}`);
            
            // Clear cart after successful payment
            queryClient.invalidateQueries(["cartItems"]);
          } catch (error) {
            toast.error("Payment verification failed");
            console.error(error);
          }
        },
        prefill: {
          name: address.orderedname,
          email: address.email,
          contact: address.phone
        },
        notes: {
          address: `${address.address_line1}, ${address.city}`
        },
        theme: {
          color: "#DB2961"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
      rzp.on('payment.failed', function(response) {
        toast.error(`Payment failed: ${response.error.description}`);
        console.error(response.error);
      });

    } catch (error) {
      setPaymentError(error.response?.data?.error || "Payment processing failed");
      toast.error("Error processing payment");
      console.error(error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (isLoading) return <p><Loader/></p>;
  if (error) return <Loader text="Error Loading Cart"/>;
  if (cartItems.length === 0){
    return(
      <div className="min-h-screen flex flex-col p-10 mx-auto justify-center items-center text-center space-y-8">
        <h1 className="text-2xl text-[#183028]"><strong>Your Cart is Empty!</strong></h1>
        <p className="text-sm">Looks like you haven't added anything to your cart yet</p>
        <button onClick={()=>navigate("/")} className="bg-[#DB296133] text-[#DB2961] hover:text-white hover:bg-[#183028]/40 p-2 pl-6 pr-6 font-semibold transition-all duration-300 transform hover:scale-105 active:scale-90">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Address Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col lg:flex-row">
          {/* Cancel Button */}
          <button
            onClick={() => setShowAddressForm(false)}
            className="absolute top-4 right-4 text-black hover:text-gray-600 cursor-pointer"
          >
            <X size={24} />
          </button>
          {/* Left Form */}
          <div className="w-full sm:w-[80%] md:w-2/3 sm:mx-auto lg:mx-0 md-space-x-6 md:mt-8 lg:mt-4 xl:mt-10 lg:space-x-6 lg:w-[50%] 2xl:w-[55%] flex flex-col p-8 lg:p-10 lg:px-12 2xl:p-16">
            <button
              onClick={() => navigate("/")}
              className="w-fit cursor-pointer"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-24 w-32 md:h-28 md:w-36 2xl:h-40 2xl:w-56 mb-5"
              />
            </button>
            <form ref={formRef} className="mt-8 lg:mt-4 2xl:mt-10 2xl:mx-auto">
              <h2 className="text-lg mb-6 text-center lg:text-left">
                YOUR ORDER UPDATE
              </h2>
              <div className="space-y-4 max-w-lg">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={address.orderedname}
                  onChange={(e) =>
                    setAddress({ ...address, orderedname: e.target.value })
                  }
                  className="w-full border-b border-black focus:outline-none pb-1"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={address.email}
                  onChange={(e) =>
                    setAddress({ ...address, email: e.target.value })
                  }
                  className="w-full border-b border-black focus:outline-none pb-1"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                  className="w-full border-b border-black focus:outline-none pb-1"
                  required
                  pattern="\d{10}"
                  maxLength={10}
                  minLength={10}
                />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={address.address_line1}
                  onChange={(e) =>
                    setAddress({ ...address, address_line1: e.target.value })
                  }
                  className="w-full border-b border-black focus:outline-none pb-1"
                  required
                />
                <div className="flex flex-row gap-x-10 lg:gap-x-12">
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-1/2 border-b  border-black focus:outline-none p-1"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="w-1/2 border-b border-black focus:outline-none pb-1"
                    required
                  />
                </div>
                <div className="flex flex-row gap-x-10 lg:gap-x-12 mb-8">
                  <input
                    type="text"
                    placeholder="Country"
                    value={address.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                    className="w-1/2 border-b border-black focus:outline-none pb-1"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={address.postal_code}
                    onChange={(e) =>
                      setAddress({ ...address, postal_code: e.target.value })
                    }
                    className="w-1/2 border-b border-black focus:outline-none pb-1"
                    required
                    pattern="\d{6}"
                    maxLength={6}
                    minLength={6}
                  />
                </div>
              </div>
              <div className="mt-4 max-w-lg w-full ">
                <div className="flex justify-end ">
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        formRef.current &&
                        !formRef.current.reportValidity()
                      ) {
                        toast.error(
                          "Please fill all required details before proceeding to payment."
                        );
                        return;
                      }
                      handleCheckout();
                    }}
                    // disabled={
                    //   isProcessingPayment ||
                    //   !address.orderedname ||
                    //   !address.email ||
                    //   !address.phone ||
                    //   !address.address_line1 ||
                    //   !address.city ||
                    //   !address.state ||
                    //   !address.postal_code
                    // }
                    disabled={isProcessingPayment}
                    className="bg-black hover:bg-gray-800 active:scale-95 transition-transform duration-150 text-white px-6 py-2 text-sm uppercase tracking-wider"
                  >
                    {isProcessingPayment ? "Processing..." : "PAYMENT MODE"}
                  </button>
                </div>
              </div>
              {paymentError && (
                <div className="text-red-500 text-sm mt-2">{paymentError}</div>
              )}
            </form>
          </div>
          {/* Right Side - Image */}
          <div className="w-full lg:w-[50%] 2xl:w-[55%] hidden lg:block">
            <img
              src={img} // Replace with actual image path
              alt="Shilpa Vummiti Bag"
              className="w-full h-full lg:max-h-[750px] xl:max-h-full object-cover object-top"
            />
          </div>
        </div>
      )}

      {/* Desktop View */}
      <div className="hidden lg:flex flex-col lg:flex-row justify-between py-8 w-full max-w-[90%] mx-auto">
        <div className="w-full lg:w-2/3 space-y-8">
          <h2 className="text-lg font-semibold border-b pb-4">
            YOUR SELECTIONS
          </h2>
          {cartItems.map(({ id, product, quantity, product_size }) => (
            <motion.div
              key={id}
              className="flex flex-col md:flex-row border-b pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={`${API_URL}${product.image}`}
                alt={product.name}
                className="w-32 h-40 object-cover mb-4 md:mb-0 md:mr-6"
              />
              <div className="flex-2 space-y-4">
                <h3 className="text-xl lg:text-2xl font-medium text-[#183028] font-tenor px-2">
                  {product.name}
                </h3>
                <p className="text-sm lg:text-base">
                  Product Code: {product.product_code || "-"}
                </p>
                <p className="text-xs">AVAILABLE</p>
                <div className="flex items-center space-x-4 text-xs">
                  <select
                    className="border-b text-sm px-2 py-1"
                    value={product_size}
                    onChange={(e) =>
                      updateItemMutation.mutate({
                        id,
                        product_size: e.target.value,
                        quantity,
                      })
                    }
                    disabled={updateItemMutation.isLoading}
                  >
                    {product.sizes?.map((size) => (
                      <option key={size.id} value={size.size}>
                        {size.size}
                      </option>
                    ))}
                  </select>
                  <span>|</span>
                  <button
                    className="hover:underline cursor-pointer"
                    onClick={() => removeItemMutation.mutate(id)}
                  >
                    REMOVE
                  </button>
                  <span>|</span>
                  <button
                    className=" hover:underline cursor-pointer"
                    onClick={() => addToWishlistMutation.mutate(product.id)}
                    disabled={addToWishlistMutation.isLoading}
                  >
                    <span className="flex items-center gap-1 ">
                      <Heart className="w-4 h-4" /> MOVE TO WISHLIST
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <select
                  className="border text-sm px-2 py-1 max-h-[130px] overflow-y-auto cursor-pointer"
                  value={quantity}
                  onChange={(e) =>
                    updateItemMutation.mutate({
                      id,
                      quantity: parseInt(e.target.value),
                      product_size, // Include current product_size when updating quantity
                    })
                  }
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Qty: {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <p className="text-lg text-center font-semibold mt-2 text-emerald-950 ">
                  ₹ {(product.price * quantity).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 mt-10 lg:mt-0 lg:pl-10">
          <h3 className="text-sm font-medium text-[#DB2961] underline mt-6 mb-5">
            ORDER SUMMARY
          </h3>
          <div className="text-sm lg:text-[15px] space-y-6 mb-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#183028] font-tenor">
                ₹ {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-[#183028] font-tenor">
                {isShippingFree ? "Free" : `₹ ${shippingCharge}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxable Amount</span>
              <span className="text-[#183028] font-tenor">
                ₹ {tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold pt-2 ">
              <span>Total</span>
              <span className="text-[#183028] font-tenor text-lg xl:text-xl">
                ₹ {total.toFixed(2)}
              </span>
            </div>
            <div>
              <span>Enjoy free shipping on all orders above ₹10,000.</span>
            </div>
          </div>

          <div className="py-6 cursor-pointer" onClick={() => toggle("view")}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#DB2961]">
                View Details
              </span>
              {expanded.view ? (
                <FiMinus className="text-[#DB2961]" />
              ) : (
                <HiMiniPlus className="text-[#DB2961]" />
              )}
            </div>
            <AnimatePresence>
              {expanded.view && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-600 mt-6"
                >
                  You will be charged at the time of shipment. If this is a
                  personalized or made-to-order purchase, you will be charged at
                  the time of purchase.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => handleProcessPayment()}
            className="w-full bg-[#DB2961]/20 hover:bg-[#183028]/40 text-[#DB2961] hover:text-white text-xl xl:text-2xl 2xl:text-[26px] py-2 transition-all duration-300 flex items-center justify-center mb-4 cursor-pointer"
            disabled={cartItems.length === 0 || isProcessingPayment}
          >
            {isProcessingPayment ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#dbcbd0]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : cartItems.length === 0 ? (
              "Cart is Empty"
            ) : (
              "Checkout"
            )}
          </button>
          {paymentError && (
            <div className="text-red-500 text-sm mt-2">{paymentError}</div>
          )}
          <div className="text-sm space-y-6 mb-4 text-left tracking-wider">
            <span>
              All our orders are processed and shipped within 2-3 business days.{" "}
              <br />
              Once your order is shipped, the tracking details will be sent
              exclusively to your registered email address.
            </span>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden py-6 text-center space-y-6 overflow-y-auto overflow-x-hidden max-h-screen px-8">
        <h2 className="text-lg font-semibold mb-4 pb-6 border-b mt-4 ">
          YOUR SELECTIONS
        </h2>
        {cartItems.map(({ id, product, quantity, product_size }) => (
          <div key={id} className="pb-6 space-y-3  ">
            <img
              src={`${API_URL}${product.image}`}
              alt={product.name}
              className="w-full max-w-48 md:max-w-56 h-auto object-cover mb-4 mt-4 mx-auto"
            />
            <h3 className="text-md font-medium text-[#183028]">
              {product.name}
            </h3>
            <p className="text-sm ">
              Product Code: {product.product_code || "-"}
            </p>
            <p className="text-xs">AVAILABLE</p>
            <p className="text-lg font-semibold text-[#183028] my-6">
              ₹ {(product.price * quantity).toLocaleString()}
            </p>
            <select
              className="border text-sm px-2 py-1 max-h-[160px] overflow-y-auto"
              value={quantity}
              onChange={(e) =>
                updateItemMutation.mutate({
                  id,
                  quantity: parseInt(e.target.value),
                  product_size, // Include current product_size when updating quantity
                })
              }
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Qty: {i + 1}
                </option>
              ))}
            </select>
            <div className="flex justify-center items-center space-x-2 text-xs pb-2">
              <select
                className="border-b text-sm px-1 py-1"
                value={product_size}
                onChange={(e) =>
                  updateItemMutation.mutate({
                    id,
                    product_size: e.target.value,
                    quantity,
                  })
                }
                disabled={updateItemMutation.isLoading}
              >
                {product.sizes?.map((size) => (
                  <option key={size.id} value={size.size}>
                    {size.size}
                  </option>
                ))}
              </select>
              <div>|</div>
              <button
                className="underline"
                onClick={() => removeItemMutation.mutate(id)}
              >
                REMOVE
              </button>
              <div>|</div>
              <button
                className="underline"
                onClick={() => addToWishlistMutation.mutate(product.id)}
                disabled={addToWishlistMutation.isLoading}
              >
                <span className="flex items-center gap-[3px] uppercase">
                  <Heart className="w-4 h-4" />
                  Move To Wishlist
                </span>
              </button>
            </div>
            <hr className="w-2/3 mx-auto border-t" />
          </div>
        ))}

        <div className="border-t pt-6 space-y-4">
          <p className="text-sm font-semibold  text-left text-[#DB2961]">
            ORDER SUMMARY
          </p>
          <div className="text-sm space-y-2 mb-4">
            <div className="flex justify-between border-t pt-4">
              <span>Subtotal</span>
              <span className="text-[#183028] font-tenor">
                ₹ {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-[#183028] font-tenor">
                {isShippingFree ? "Free" : `₹ ${shippingCharge}`}
              </span>
            </div>
            <div className="flex justify-between pb-2">
              <span>Taxable Amount</span>
              <span className="text-[#183028] font-tenor">
                ₹ {tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold pt-4 text-lg">
              <span>Total</span>
              <span className="text-[#183028] font-tenor">
                ₹ {total.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-left pt-4">
              <span>Enjoy free shipping on all orders above ₹10,000.</span>
            </div>
          </div>

          <div className=" py-8 cursor-pointer" onClick={() => toggle("view")}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#DB2961]">
                View Details
              </span>
              {expanded.view ? (
                <FiMinus className="text-[#DB2961]" />
              ) : (
                <HiMiniPlus className="text-[#DB2961]" />
              )}
            </div>
            <AnimatePresence>
              {expanded.view && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-600 mt-4 text-left"
                >
                  You will be charged at the time of shipment. If this is a
                  personalized or made-to-order purchase, you will be charged at
                  the time of purchase.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => handleProcessPayment()}
            className="w-full bg-[#DB2961]/20 hover:bg-[#183028]/40 text-[#DB2961] text-xl hover:text-white font-medium tracking-wide py-3 transition-all duration-300 flex items-center justify-center"
            disabled={cartItems.length === 0 || isProcessingPayment}
          >
            {isProcessingPayment ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#DB2961]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : cartItems.length === 0 ? (
              "Cart is Empty"
            ) : (
              "Checkout"
            )}
          </button>
          {paymentError && (
            <div className="text-red-500 text-sm mt-2">{paymentError}</div>
          )}
          <div className="text-sm space-y-6 mb-4 text-left tracking-wider">
            <span>
              All our orders are processed and shipped within 2-3 business days.{" "}
              <br />
              Once your order is shipped, the tracking details will be sent
              exclusively to your registered email address.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;