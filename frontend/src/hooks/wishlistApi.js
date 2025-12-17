// src/api/wishlistApi.js
import API from "../api";

// ✅ Get Wishlist (GET /wishlist/?cart_code=...)
export const getWishlist = async () => {
  const cartCode = localStorage.getItem("cart_code");
  const response = await API.get(`/wishlist/?cart_code=${cartCode}`);
  return response.data;
};

// ✅ Delete Wishlist Item (DELETE /wishlist/)
export const deleteWishlistItem = async (productId) => {
  const cartCode = localStorage.getItem("cart_code");
  const response = await API.delete("/wishlist/", {
    data: { product_id: productId, cart_code: cartCode },
  });
  return response.data;
};

// ✅ Add to Wishlist (POST /wishlist/)
export const addToWishlist = async (productId) => {
  const cartCode = localStorage.getItem("cart_code");
  const response = await API.post("/wishlist/", {
    product_id: productId,
    cart_code: cartCode,
  });
  return response.data;
};

// ✅ Add to Cart (POST /cart-items/)
export const addToCart = async ({ productId, cartCode, selectedSize }) => {
  const response = await API.post("/cart-items/", {
    product_id: productId,
    cart_code: cartCode,
    selectedSize: selectedSize || null,  // optional size
  });
  return response.data;
};
