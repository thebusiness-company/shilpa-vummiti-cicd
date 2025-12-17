import React from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductsByCategory } from '../../hooks/useProducts';
import { API_URL } from '../../api';
import Loader from '../ui/Loader';
import { useEffect, useState } from 'react';
import {
  getWishlist,
  deleteWishlistItem,
  addToWishlist,
} from "../../hooks/wishlistApi";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // each product appears 0.2s after the previous
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function CategoryFullPage() {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['all-products', id],
    queryFn: () => getProductsByCategory(id),
    enabled: !!id,
  });
  console.log(products);
  const categoryName = products?.data?.[0]?.category_name || "Category";

    useEffect(() => {
      const fetchWishlist = async () => {
        try {
          const data = await getWishlist();
          setWishlist(data);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };
      fetchWishlist();
    }, []);

    useEffect(() => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    },[]);

     const handleScrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
     };
  

  if (isLoading) return <Loader/>;
  if (isError) return <Loader text="Failed to Load Products"/>;
  
      const handleWishlistToggle = async (product) => {
        const iswishlisted = wishlist.some(
          (item) => item.product?.id === product.id
        );

        if (iswishlisted) {
          await deleteWishlistItem(product.id);
          const updatedAfterRemoval = await getWishlist();
          setWishlist(updatedAfterRemoval);
          toast.success("Removed from wishlist!");
        } else {
          await addToWishlist(product.id);
          const updatedAfterAddition = await getWishlist();
          setWishlist(updatedAfterAddition);
          toast.success("Added to wishlist!");
        }
      };
    

return (
  <div className="p-4 max-w-8xl mx-auto">
    <h2 className="text-lg lg:text-xl lg:ml-25 my-3 lg:my-6 mb-4 text-start font-tenor text-[#183028]">
      {categoryName}
    </h2>
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-10 transition-all duration-500 w-full max-w-[90%] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products?.data.map((prod) => (
        <motion.div
          key={prod.id}
          className="text-center group relative"
          variants={itemVariants}
        >
          <Link to={`/productDetail/${prod.slug}`}>
            <img
              src={`${API_URL}${prod.image}`}
              alt={prod.name}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-2 font-medium text-sm sm:text-base lg:text-lg 2xl:text-xl text-[#183028] font-tenor">
              {prod.name}
            </p>
            <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-[#183028] font-tenor">
              ₹ {prod.price}
            </p>
          </Link>
          {/* wishlist button */}
          <button
            onClick={() => handleWishlistToggle(prod)}
            className="absolute top-2 right-2 z-10 cursor-pointer"
          >
            {wishlist.some((item) => item.product?.id === prod.id) ? (
              <Heart className="w-5 h-5 fill-[#DB2961] stroke-[#DB2961] z-10" />
            ) : (
              <Heart className="w-5 h-5 stroke-black z-10" />
            )}
          </button>
        </motion.div>
      ))}
    </motion.div>
    {/* desktop view less and more buttons */}
    <div className="flex flex-row justify-end gap-4 mt-6 font-palanquin text-[#183028] w-full max-w-[90%] mx-auto">
      <button
        onClick={handleScrollTop}
        className="underline text-xl hover:text-blue-800 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
      >
        Back to Top
      </button>
    </div>
  </div>
);
}
