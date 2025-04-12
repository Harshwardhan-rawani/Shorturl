import { useState } from "react";
import { motion } from "framer-motion";
import { FaLink } from "react-icons/fa";
import axios from "axios";
import ReactQR from "react-qr-code";// Import the QR code library

const Card = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiration, setExpiration] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateShortLink = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/create-short-link`,
        {
          longUrl,
          customAlias,
          expirationDate: expiration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShortLink(response.data.shortUrl);
      setShowResult(true);
    } catch (err) {
      setError("Error generating short link. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mx-auto p-4 md:p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur-xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Side - Image & Icon */}
        <div className="w-full md:w-1/2 bg-gradient-to-tr from-orange-100 to-orange-300 flex flex-col justify-center items-center p-6 text-orange-700 relative">
          <FaLink size={40} className="mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Shorten Your Link
          </h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/892/892692.png"
            alt="Link Illustration"
            className="w-28 md:w-40 mt-4"
          />

          {/* Show Short Link and QR Code below image */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 w-full text-center bg-white rounded-lg p-4 shadow-md border border-green-400"
            >
              <p className="text-green-700 font-semibold mb-1">Short Link:</p>
              <a
                href={shortLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline break-all"
              >
                {shortLink}
              </a>
              
              {/* Display QR Code */}
              <div className="mt-4 w-full flex justify-center">
                <ReactQR value={shortLink} size={128} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-4 md:p-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-orange-600 text-center">
            Create Short Link
          </h2>

          <input
            type="url"
            placeholder="Enter Long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="text"
            placeholder="Custom Alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="date"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <motion.button
            whileHover={{
              backgroundColor: "orange",
              color: "white",
              transition: { duration: 0.2 },
            }}
            onClick={generateShortLink}
            className="w-full px-4 py-2 border border-orange-500 text-orange-500 rounded-lg font-semibold text-sm md:text-base"
          >
            {loading ? "Generating..." : "Generate"}
          </motion.button>

          {error && (
            <p className="text-red-500 mt-2 text-center">{error}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
