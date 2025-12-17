import React, { useState, useEffect } from "react";
import img from "../assets/images/profile.png";
import logo from "../assets/images/Logo.png";
import API from "../api";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("profile/");
        setFormData({
          username: data.username || "",
          email: data.email || "",
          mobile: data.phone_number || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          zip: data.zip_code || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await API.patch("profile/", {
        username: formData.username,
        email: formData.email,
        phone_number: formData.mobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zip_code: formData.zip,
      });

      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update failed", error);
    } finally {
      setLoading(false);
    }
  };
  const Logout = () =>{
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href  = "/";
  };

  return (
    <div className="min-h-screen w-full bg-white ">
      <div className="flex flex-col md:flex-row md:mt-4 w-full max-w-[90%] mx-auto lg:mb-12">
        {/* Left Section */}
        <div className="w-full md:w-2/3 lg:w-1/2 px-2 md:px-6 flex flex-col items-start mx-auto">
          <div className="mt-6 mb-12 2xl:mb-20 cursor-pointer" onClick={() => navigate("/")} >
            <img src={logo} alt="Logo" className="w-40 2xl:w-44" />
          </div>

          <h2 className="text-xl text-center lg:text-left font-semibold tracking-widest mb-10 w-full">
            PROFILE UPDATE
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-md 2xl:max-w-lg"
          >
            <input
              type="text"
              name="username"
              placeholder="User Name"
              value={formData.username}
              onChange={handleChange}
              className="border-b w-full outline-none pb-2 text-sm md:text-base xl:text-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border-b w-full outline-none pb-2 text-sm md:text-base xl:text-lg"
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="border-b w-full outline-none pb-2 text-sm md:text-base xl:text-lg"
              pattern="\d{10}"
              maxLength={10}
              minLength={10}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border-b w-full outline-none pb-2 text-sm md:text-base xl:text-lg"
              required
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border-b w-full outline-none pb-2 text-sm md:text-base xl:text-lg"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border-b w-full outline-none pb-2 text-sm md:text-base xl:text-lg"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="border-b w-full outline-none pb-2 text-sm md:text-base xl:text-lg"
                required
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip"
                value={formData.zip}
                onChange={handleChange}
                className="border-b w-full outline-none pb-2 text-sm md:text-base xl:text-lg"
                pattern="\d{6}"
                maxLength={6}
                minLength={6}
                required
              />
            </div>
            <div className="flex justify-center md:justify-end items-center ">
              <button
                type="submit"
                disabled={loading}
                className="mt-6 px-6 py-2 bg-black text-white text-sm xl:text-base 2xl:text-lg w-fit hover:bg-white hover:text-black border border-black transition cursor-pointer"
              >
                {loading ? "Updating..." : "UPDATE PROFILE"}
              </button>
            </div>

            {successMessage && (
              <p className="text-green-600 text-sm mt-2">{successMessage}</p>
            )}
          </form>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex md:hidden lg:flex justify-center py-8 px-2 lg:pl-10">
          <img
            src={img}
            alt="Fashion Model"
            className="w-full 2xl:max-w-[90%] h-auto max-h-[600px] 2xl:max-h-[900px] object-cover p-8"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
