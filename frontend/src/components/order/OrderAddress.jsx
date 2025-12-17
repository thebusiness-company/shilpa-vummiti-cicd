import React, { useState } from "react";

const OrderAddress = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
      alert("Order updated successfully!");
      console.log("Submitted Data:", formData);
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 px-6 lg:px-20 py-10 flex flex-col justify-center">
        <div className="mb-10">
          <img src="/logo.png" alt="Shilpa Vummiti Logo" className="w-48 mb-6" />
          <h2 className="text-sm font-medium tracking-wide text-gray-800 uppercase mb-8">
            Your Order Update
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="User Name"
              className="w-full border-b border-gray-400 py-2 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border-b border-gray-400 py-2 focus:outline-none"
              required
            />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full border-b border-gray-400 py-2 focus:outline-none"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border-b border-gray-400 py-2 focus:outline-none"
              required
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-1/2 border-b border-gray-400 py-2 focus:outline-none"
                required
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-1/2 border-b border-gray-400 py-2 focus:outline-none"
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-1/2 border-b border-gray-400 py-2 focus:outline-none"
                required
              />
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Zip"
                className="w-1/2 border-b border-gray-400 py-2 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              
            >
              {loading ? "Updating..." : "Update Order"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full lg:w-1/2 hidden lg:block">
        <img
          src="/bag-model.png" // Replace with actual image path
          alt="Shilpa Vummiti Bag"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default OrderAddress;
