import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api";
import logo from "../assets/images/Logo.png";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await API.post(`reset-password/${uid}/${token}/`, {
        password,
        password2,
      });
      setMessage("Password reset successfully. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMessage("Reset failed. Link may be invalid or expired.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-start px-6 md:px-40 py-10 bg-white">
      {/* Logo */}
      <div className="mb-10">
        <img
          src={logo} // your logo image path
          alt="Shilpa Vummiti Logo"
          className="h-20 lg:h-25"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col"
      >
        <h2 className="text-lg mb-8">ENTER YOUR PASSWORD</h2>

        {/* New Password */}
        <div className="mb-6 w-full">
          <input
            type="password"
            placeholder="NEW PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border-b border-gray-400 py-2 px-1 focus:outline-none"
          />
        </div>

        {/* Confirm New Password */}
        <div className="mb-10 w-full">
          <input
            type="password"
            placeholder="CONFIRM NEW PASSWORD"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            className="w-full border-b border-gray-400 py-2 px-1 focus:outline-none"
          />
        </div>

        {/* Right-Aligned Save Button */}
        <div className="w-full flex justify-end">
          <motion.button
            type="submit"
            className="bg-black text-white px-6 py-2 text-xs tracking-widest hover:opacity-90 transition"
            whileTap={ { scale: 1.1} }
          >
            SAVE CHANGES
          </motion.button>
        </div>

        {/* Message */}
        {message && (
          <p className="mt-4 text-red-600 text-sm font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
