import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PasswordChangedPage = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    // Animate the dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(dotsInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 text-center space-y-8 transform transition-all duration-300 hover:scale-[1.02]">
        <div className="relative">
          <div className="absolute inset-0 bg-green-100 rounded-full w-24 h-24 mx-auto blur-lg opacity-70"></div>
          <div className="relative bg-green-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto ring-8 ring-green-50">
            <CheckCircle
              className="text-green-500 w-12 h-12"
              strokeWidth={2.5}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Password Changed Successfully
          </h1>
          <p className="text-gray-600 text-base">
            Your password has been updated.
          </p>
          <p className="text-gray-500 font-medium">Redirecting to login{dots}</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangedPage;
