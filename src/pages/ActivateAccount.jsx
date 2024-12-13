import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const ActivateAccount = () => {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const { uid, token } = useParams();

  useEffect(() => {
    // Call the activation API
    const activateAccount = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/activate/${uid}/${token}/`
        );
        if (response.status === 200) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setStatus("expired");
        } else {
          setStatus("error");
        }
        console.error(error); 
      }
    };
    activateAccount();
  }, [uid, token, navigate]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <Loader2 className="mx-auto h-16 w-16 text-blue-500 animate-spin mb-4" />
              <p className="text-2xl text-gray-700">
                Activating your account...
              </p>
            </div>
          </div>
        );
      case "success":
        return (
          <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <p className="text-2xl text-green-700">
                Your account has been activated successfully!
              </p>
              <p className="text-gray-600 mt-2">Redirecting to login...</p>
            </div>
          </div>
        );

      case "expired":
        return (
          <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
            <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
              <XCircle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
              <h2 className="text-2xl text-gray-800 mb-4">
                Activation Link Expired
              </h2>
              <p className="text-gray-600 mb-4"> A new activation email has been sent.</p>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="text-center">
              <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
              <p className="text-2xl text-red-700">
                Error activating your account
              </p>
              <p className="text-gray-600 mt-2">
                Please try again later or contact support
              </p>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Return to Login
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderContent();
};

export default ActivateAccount;
