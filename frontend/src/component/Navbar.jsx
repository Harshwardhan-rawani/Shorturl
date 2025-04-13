import { AnimatePresence,motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import { Link } from 'react-router-dom';
import Login from './Login';
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    useEffect(() => {
    
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("userName"); 
      if (token) {
        setIsLoggedIn(true);
        setUserName(user || "User"); 
      }
    }, []);
  
    return (
      <div>
        <nav
          className={`w-full px-6 py-4 flex items-center justify-between z-50 transition-all duration-300  ${
            isScrolled ? 'fixed top-0 left-0 backdrop-blur-lg shadow-md' : 'absolute top-0 bg-transparent'
          }`}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              U-Gen
            </Link>
          </div>
  
          {/* Nav Menu */}
          <div className="hidden md:flex gap-8 text-gray-700 text-lg">
            <Link to="/"><FaHome className='text-3xl'/></Link>
          </div>
  
          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-2 text-orange-600 font-medium">
                <FaUserCircle className="text-4xl" />
                <button 
                onClick={()=>{localStorage.removeItem("authToken"); window.location.reload()}}
                className="bg-orange-600 text-white px-4 py-1 rounded-full hover:bg-orange-700 transition">Logout</button>
                
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-orange-600 border border-orange-600 px-4 py-1 rounded-full hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-600 text-white px-4 py-1 rounded-full hover:bg-orange-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
  
          {/* Hamburger */}
          <div className="md:hidden flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <button className="text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
  
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="md:hidden absolute top-16 text-white z-50 h-screen left-0 w-full bg-gray-600 shadow-lg py-4 px-6 flex flex-col items-center gap-4"
              >
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                {isLoggedIn ? (
                    <div className="flex items-center gap-2 text-orange-600 font-medium">
                    <FaUserCircle className="text-4xl" />
                    <button 
                    onClick={()=>{localStorage.removeItem("authToken"); window.location.reload()}}
                    className="bg-orange-600 text-white px-4 py-1 rounded-full hover:bg-orange-700 transition">Logout</button>
                    
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-orange-600 border border-orange-600 px-4 py-1 rounded-full hover:bg-blue-50 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-orange-600 text-white px-4 py-1 rounded-full hover:bg-orange-700 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    );
  }
  

export default Navbar
