import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../assets/images/login.png";
import logo from "../assets/images/Logo.png";
import { API, API_URL } from '../api';
import { AuthContext } from "../components/context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, getuser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    API.post("token/", formData)
      .then(res => {
        setIsLoading(false);
        setIsAuthenticated(true);
        getuser();
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        setFormData({ email: "", password: "" });
        setError("");
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch(() => {
        setIsLoading(false);
        setError("Invalid email or password");
      });
  };
  const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
        console.log("googleAccessToken",tokenResponse.access_token);

    try {
      const res = await axios.post(`${API_URL}/rest-auth/google/`, {
        access_token: tokenResponse.access_token,
      });
      console.log("google Login response:",res.data);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh",res.data.refresh);

      setIsAuthenticated(true);
      getuser();
      setError("");

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed");
    }
  },
  onError: () => setError("Google login was cancelled or failed"),
});


  const handleGuestLogin = async () => {
    const timestamp = Date.now();
    const guestEmail = `guest${timestamp}@gmail.com`;
    const guestUsername = `guest${timestamp}`;
    const guestPassword = "Guest@123";

    try {
      // 1. Register the guest user
      await API.post("user/register/", {
        username: guestUsername,
        email: guestEmail,
        mobile: "0000000000",
        password: guestPassword,
        password2: guestPassword,
      });

      // 2. Log in the guest user
      const res = await API.post("token/", {
        email: guestEmail,
        password: guestPassword,
      });

      setIsAuthenticated(true);
      getuser();
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setError("");

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError("Guest login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row md:items-center lg:items-start max-w-[96%] lg:max-w-[90%] mx-auto lg:mt-6">
      {/* Left Section */}
      <div className="w-full md:w-[50%] lg:w-[60%] px-6 py-6 lg:py-8  flex flex-col items-start max-w-md 2xl:max-w-lg md:mr-auto">
        <img src={logo} alt="Logo" className="lg:mb- w-40" />

        <div className="text-lg 2xl:text-xl mt-10 lg:mt-14 2xl:mt-20 mb-10 2xl:mb-10 lg:ml-3">
          <Link to="/login" className="underline mr-2 font-bold">
            LOG IN
          </Link>{" "}
          /
          <Link to="/signup" className="ml-2 mr-2">
            SIGN UP
          </Link>{" "}
          /
          <span
            className="ml-2 cursor-pointer underline hover:text-gray-900"
            onClick={handleGuestLogin}
          >
            GUEST LOGIN
          </span>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="w-full lg:ml-3"
        >
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
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="PASSWORD"
            required
            className="w-full border-b border-gray-400 mb-2 pb-2 outline-none bg-transparent text-sm"
          />
          <a
            href="/forgot-password"
            className="text-sm xl:text-[15px] underline mb-8 inline-block mt-3"
          >
            Have you forgotten your password?
          </a>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="border border-black px-8 md:px-12 cursor-pointer py-2 text-xs md:text-sm hover:bg-black hover:text-white transition duration-200"
            >
              {isLoading ? "Signing in..." : "LOG IN"}
            </button>

            <div className="text-xs">OR</div>

            <button
              type="button"
              className="border px-8 md:px-12 py-2 text-sm flex cursor-pointer items-center gap-2 hover:bg-black hover:text-white transition duration-200"
              onClick={() => googleLogin()}
            >
              <span className="text-xs md:text-sm">GOOGLE</span>
            </button>
          </div>
        </form>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-[50%] lg:w-[40%] h-full flex items-center justify-center px-6 py-1 lg:py-6 md:mt-20 lg:mt-6 mb-6">
        <img
          src={img}
          alt="Fashion"
          className="object-cover w-full h-full max-h-[600px] xl:max-h-[700px] 2xl:max-h-[800px]"
        />
      </div>
    </div>
  );
};

export default Login;
