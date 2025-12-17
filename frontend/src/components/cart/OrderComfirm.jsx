import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import Loader from "../ui/Loader";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await API.get(`order/${orderId}/`);
        setOrder(response.data);
      } catch {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      console.log("Order state updated:", order);
    }
  }, [order]);

// console.log(order,"llllllllll")
  if (loading) return <Loader />;
  if (error) return <Loader text={error}/>;

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-[#DB2961] text-3xl lg:text-5xl">
          Thank You!
        </h1>
        <div className="border-t border-b border-[#DB2961] md:border w-full md:w-2/3 mt-12 md:mt-10">
          <div className="p-10 flex flex-col items-center justify-center tracking-wide text-center">
          <p>Thank you! We've successfully received your order.</p>
          <p>Your order number is {order?.order_id}.</p>
          <p> You will receive an email with tracking details once your order has been shipped.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
