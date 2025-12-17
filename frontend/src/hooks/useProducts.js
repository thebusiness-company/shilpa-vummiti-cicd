import { API } from "../api";

export const getCategories = () => API.get(`/categories/`);
export const getProductsByCategory = (id, limit = null) =>
  API.get(`/products/${id}/`, { params: { limit } });
export const getProductBySlug = async ({ queryKey }) => {
  const [, slug] = queryKey;
  const res = await API.get(`product/${slug}/`);
  return res.data;
};
