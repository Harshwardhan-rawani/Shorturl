import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa"; // React Icon
import { ImSpinner2 } from "react-icons/im"; // Spinner Icon
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // 🟢 Loading state

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/auth/signup`, formData);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      console.log("Signup successful:", response.data);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg backdrop-blur-lg bg-white/70"
      >
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-orange-100 p-8">
          <FaUserPlus size={150} color="#61DBFB" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-orange-600 text-center">Sign Up</h2>

          <div className="flex-col space-y-2.5">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <motion.button
              onClick={handleSignup}
              whileHover={!loading && {
                backgroundColor: "orange",
                color: "white",
                transition: { duration: 0.2 },
              }}
              disabled={loading}
              className={`w-full px-4 py-2 flex justify-center items-center gap-2 border border-orange-500 text-orange-500 rounded-lg font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <ImSpinner2 className="animate-spin" size={20} />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </div>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
