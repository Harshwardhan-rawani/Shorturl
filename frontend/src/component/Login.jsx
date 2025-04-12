import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/auth/login`, { email, password });
      const token = response.data.token; 
      localStorage.setItem("authToken", token); 
      console.log("Login successful:", response.data);

      navigate("/")
      window.location.reload()
      
    } catch (error) {
      console.error("Login error:", error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <motion.div
     exit={{opacity:0}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg backdrop-blur-lg bg-white/70"
    >
      <div className="hidden md:flex w-1/2 items-center justify-center bg-orange-100 p-8">
        {/* Replace image with React icon */}
        <RiLoginBoxFill size={150} color="#61DBFB" />
      </div>

      <div className="w-full md:w-1/2 p-8 space-y-6">
        <h2 className="text-3xl font-bold text-orange-700 text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex-col space-y-2.5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
  
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <motion.button
            whileHover={{
              backgroundColor: "orange",
              color: "white",
              transition: { duration: 0.2 },
            }}
            className="w-full px-4 py-3 border border-orange-500 text-orange-500 rounded-lg font-semibold"
          >
            Login
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  </div>
  );
};

export default Login;
