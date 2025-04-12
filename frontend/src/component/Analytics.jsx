import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [tableData, setTableData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken");

  // Fetch Short Links
  const fetchShortLinks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/create-short-link`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const shortLinks = res.data.data;
      setTableData(shortLinks);

      // Aggregate Line Chart Data
      const aggregated = shortLinks.reduce((acc, row) => {
        const date = new Date(row.creationDate).toLocaleDateString();
        const clicks = row.clicks;

        const existing = acc.find(item => item.date === date);
        if (existing) {
          existing.clicks += clicks;
        } else {
          acc.push({ date, clicks });
        }

        return acc;
      }, []);
      setLineChartData(aggregated);
    } catch (err) {
      console.error("Error fetching short links:", err);
      setError("Error fetching short links.");
    }
  };

  // Fetch Device Analytics
  const fetchDeviceAnalytics = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/analytic`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const counts = res.data.data;
    console.log(counts)
      const formatted = [
        { device: "Mobile", clicks: counts.mobile || 0 },
        { device: "Tablet", clicks: counts.tablet || 0 },
        { device: "Desktop", clicks: counts.desktop || 0 },
      ];
      setBarChartData(formatted);
    } catch (err) {
      console.error("Error fetching analytics data:", err);
      setError("Error fetching device analytics.");
    }
  };

  // Combined Fetch
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([fetchShortLinks(), fetchDeviceAnalytics()]);
      setLoading(false);
    };

    loadAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-radial from-[#ffad81dd] to-[#fff6ec9a] py-20 px-4">
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-xl font-bold text-orange-600 mb-10">Analytics Dashboard</h2>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          {/* Line Chart */}
          {!error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-md bg-white/70 border border-white/40 shadow-lg rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                📈 Clicks Over Time
              </h3>
              {lineChartData.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No data available for line chart.<br />
                  <span className="text-sm text-gray-400">Share links to start tracking clicks.</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={{ r: 3, strokeWidth: 2, fill: "#f97316" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </motion.div>
          )}

          {/* Bar Chart */}
          {!error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-md bg-white/70 border border-white/40 shadow-lg rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                📊 Device Clicks Breakdown
              </h3>
              {barChartData.every(device => device.clicks === 0) ? (
                <div className="text-center text-gray-500 py-8">
                  No data available for bar chart.<br />
                  <span className="text-sm text-gray-400">Start by creating and sharing short links!</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="device" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="clicks" fill="#f97316" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </motion.div>
          )}
        </div>

        {/* Table */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 shadow-lg rounded-2xl p-4 my-12 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Short Links</h3>
          {tableData.length === 0 ? (
            <div className="text-center text-gray-500">No short links found.</div>
          ) : (
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-800 uppercase bg-white/20">
                <tr>
                  <th className="px-4 py-2">Original URL</th>
                  <th className="px-4 py-2">Short URL</th>
                  <th className="px-4 py-2">Clicks</th>
                  <th className="px-4 py-2">Created</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <motion.tr
                    key={row.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/30 hover:bg-white/10 transition"
                  >
                    <td className="px-4 py-2 break-words">{row.longUrl}</td>
                    <td className="px-4 py-2 break-all text-blue-700">
                      <a href={row.shortUrl} target="_blank" rel="noreferrer">
                        {row.shortUrl}
                      </a>
                    </td>
                    <td className="px-4 py-2">{row.clicks}</td>
                    <td className="px-4 py-2">{new Date(row.creationDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      {row.status === "Active" ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-500">Expired</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
