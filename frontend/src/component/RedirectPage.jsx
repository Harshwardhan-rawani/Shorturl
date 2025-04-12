import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const RedirectPage = () => {
  const { shortId } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let didRedirect = false;
  
    const fetchAndRedirect = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/redirect/${shortId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!didRedirect && response.status === 200 && response.data.originalUrl) {
          didRedirect = true;
          window.location.replace(response.data.originalUrl); 
        }
      } catch (error) {
        const status = error.response?.status;
        if (status === 404) navigate("/404");
        else if (status === 410) navigate("/expired");
        else navigate("/error");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAndRedirect();
  
    // no need to set isMounted — simplified with `didRedirect` flag
  }, [shortId, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
      {loading && (
        <div className="text-center">
          <ClipLoader color="#f97316" loading={true} size={60} />
          <p className="mt-4">Redirecting, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default RedirectPage;
