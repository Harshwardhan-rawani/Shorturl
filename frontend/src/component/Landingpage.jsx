import { AnimatePresence, motion } from "framer-motion";
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"
import { Link } from "react-router-dom";

export default function Landingpage() {


  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return ( <>

    <motion.div
     exit={{opacity:0}}
    className="text-gray-800 bg-radial from-[#ffad81dd] to-[#fff6ec9a] dark:bg-gray-900 dark:text-white font-sans">
    
      {/* Hero Section */}
      <section className=" pt-40 flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl font-bold mb-4"
        >
          Shorten URLs. <span className="text-orange-600">Track Performance.</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-6 text-lg"
        >
          Modern link analytics and shortening in one beautiful dashboard.
        </motion.p>
        <div className="flex space-x-5">
        <Link to={"/card"}>
        <motion.button
   
           variants={fadeUp}
           initial="hidden"
           whileInView="show"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-600 cursor-pointer text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-700"
        >
          Generate
        </motion.button>
        </Link>
        <Link to={"/analytics"}>
        <motion.button
           variants={fadeUp}
           initial="hidden"
           whileInView="show"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-600 cursor-pointer text-white px-6 py-3 rounded-full shadow-md hover:bg-orange-700"
        >
          Analytics
        </motion.button>
        </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-3xl font-semibold text-center mb-12"
        >
          Powerful Link Insights
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            "Click Tracking",
            "Device Detection",
            "Geolocation",
            "Expiration Dates",
            "QR Codes",
            "Custom Aliases",
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileHover={{
                scale:1.08,
                backgroundColor: "#e25702",
                color: "white",
                transition: { duration: 0.2 }
              }}
              whileInView="show"
              className=" bg-[#ffffffc3] cursor-pointer backdrop-blur-xl dark:bg-gray-800 p-6 rounded-xl shadow"
            >
              <h3 className="font-semibold text-xl mb-2">{feature}</h3>
              <p className="text-sm  dark:text-gray-300">
                {feature} lets you optimize how your links perform.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 bg-[#fff] dark:bg-blue-900">
        <h2 className="text-3xl text-center font-bold mb-10">How it Works</h2>
        <ol className="flex flex-col md:flex-row justify-around items-center gap-8">
          {["Paste URL", "Customize", "Track Performance"].map((step, idx) => (
            <motion.li
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="text-center max-w-xs"
            >
              <div className="text-5xl font-bold mb-2">{idx + 1}</div>
              <h3 className="text-xl font-semibold mb-1">{step}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {step} and start understanding your traffic.
              </p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Screenshots */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold text-center mb-8">Live Preview</h2>
  <div className="grid md:grid-cols-2 gap-6">
    <img
      src={image1}
      alt="Preview 1"
      className="h-64 w-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
    />
    <img
      src={image2}
      alt="Preview 2"
      className="h-64 w-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
    />
  </div>
</section>


  
      {/* Testimonials */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((id) => (
            <motion.div
              key={id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
            >
              <p className="italic mb-2">“This tool helped me boost my click-through rate significantly!”</p>
              <span className="font-semibold">— User {id}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-blue-50 dark:bg-blue-900">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {["Is it free to use?", "Can I see analytics per link?", "How secure are the links?"].map((q, idx) => (
            <motion.details
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer"
            >
              <summary className="font-semibold text-lg">{q}</summary>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                Absolutely! All features are available in the free plan with upgrade options.
              </p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Shortly — All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </footer>
    </motion.div>
    </>
  );
}
