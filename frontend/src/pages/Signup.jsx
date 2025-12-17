import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/signup.png";
import logo from "../assets/images/Logo.png";
import API from "../api";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { API_URL } from "../api";
import { AuthContext } from "../components/context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Password validation function
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("Password must be at least 8 characters.");
  if (!/[A-Z]/.test(password)) errors.push("Include at least one uppercase letter.");
  if (!/[a-z]/.test(password)) errors.push("Include at least one lowercase letter.");
  if (!/[0-9]/.test(password)) errors.push("Include at least one number.");
  if (!/[!@#$%^&*]/.test(password)) errors.push("Include at least one special character (!@#$%^&*).");

  const commonPasswords = ["password", "12345678", "qwerty", "abc123"];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push("Password is too common.");
  }

  return errors;
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, getuser } = useContext(AuthContext);

    const googleSignup = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        console.log("googleAccessToken", tokenResponse.access_token);

        try {
          const res = await axios.post(`${API_URL}/rest-auth/google/`, {
            access_token: tokenResponse.access_token,
          });
          console.log("google Login response:", res.data);
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);

          setIsAuthenticated(true);
          getuser();
          setError("");

          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        } catch (err) {
          console.error("Google Signup error:", err);
          setError("Google Signup failed");
        }
      },
      onError: () => setError("Google Signup was cancelled or failed"),
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordErrors([]);
    setIsLoading(true);

    const validationErrors = validatePassword(formData.password);
    if (validationErrors.length > 0) {
      setPasswordErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await API.post("user/register/", {
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        password2: formData.password2,
      });
      setFormData({ username: "", email: "", mobile: "", password: "", password2: "" });
      navigate("/login");
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === "object") {
        const messages = Object.values(data).flat(); // Flatten all error messages
        setPasswordErrors(messages); // Reuse passwordErrors to display them
      } else {
        setError("An unexpected error occurred.");
      }
    }
     finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row md:items-center lg:items-start max-w-[96%] lg:max-w-[90%] mx-auto lg:mt-6">
      {/* Left Section */}
      <div className="w-full md:w-[50%] lg:w-[60%] px-6 lg:px-0 py-6 lg:py-8 flex flex-col items-start max-w-md md:mr-auto">
        <img src={logo} alt="Logo" className="w-40" />

        <div className="text-lg 2xl:text-xl mt-10 lg:mt-14 2xl:mt-20 mb-10 2xl:mb-10 lg:ml-3">
          <Link to="/login" className="mr-2">
            LOG IN
          </Link>{" "}
          /
          <Link to="/signup" className="ml-2 underline font-bold text-black">
            SIGN UP
          </Link>
        </div>

        {/* Errors */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {passwordErrors.length > 0 && (
          <ul className="text-red-600 text-xs list-disc list-inside mb-4">
            {passwordErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full lg:ml-3">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="USER NAME"
            required
            className="w-full border-b border-gray-400 mb-4 pb-4 outline-none bg-transparent text-sm"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="EMAIL"
            required
            className="w-full border-b border-gray-400 mb-4 pb-4 outline-none bg-transparent text-sm"
          />
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="MOBILE NUMBER"
            required
            className="w-full border-b border-gray-400 mb-4 pb-4 outline-none bg-transparent text-sm"
            pattern="\d{10}"
            maxLength={10}
            minLength={10}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="PASSWORD"
            required
            className="w-full border-b border-gray-400 mb-4 pb-4 outline-none bg-transparent text-sm"
          />
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            placeholder="RE-ENTER PASSWORD"
            required
            className="w-full border-b border-gray-400 mb-4 pb-4 outline-none bg-transparent text-sm"
          />

          {/* Buttons */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="border border-black px-8 md:px-12 py-2 text-xs md:text-sm hover:bg-black hover:text-white transition duration-200 cursor-pointer"
            >
              {isLoading ? "Signing up..." : "SIGN UP"}
            </button>
            <div className="text-xs">OR</div>
            <button
              type="button"
              className="border px-8 py-2 text-xs md:text-sm flex items-center gap-2 hover:bg-black hover:text-white transition duration-200 cursor-pointer"
              onClick={() => googleSignup()}
            >
              <span>GOOGLE</span>
            </button>
          </div>
        </form>
      </div>

      {/* Right Section with Image */}
      <div className="w-full md:w-[50%] lg:w-[40%] h-full flex items-center justify-center px-6 py-1 lg:py-6 md:mt-20 lg:mt-6 mb-6">
        <img
          src={img}
          alt="Signup"
          className="object-cover w-full h-full max-h-[600px] xl:max-h-[700px] 2xl:max-h-[800px]"
        />
      </div>
    </div>
  );
};

export default Signup;
