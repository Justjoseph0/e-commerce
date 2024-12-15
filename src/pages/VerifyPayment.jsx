import { useState, useEffect } from "react";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const VerifyPayment = () => {
  const { verifyPayment } = useCart();
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const handleVerifyPayment = async () => {
      try {
        // Extract reference from URL (assuming you're using react-router)
        const urlParams = new URLSearchParams(window.location.search);
        const reference = urlParams.get("reference");

        if (!reference) {
          throw new Error("No payment reference found");
        }

        // Make API call to verify payment
        const response = await verifyPayment(reference)

        console.log(response);
        

        if (response.data.status === "success") {
          setVerificationStatus("success");
          setPaymentDetails(response.data.payment);
        } else {
          setVerificationStatus("failed");
          setErrorMessage(
            response.data.message || "Payment verification failed"
          );
        }
      } catch (error) {
        setVerificationStatus("failed");
        setErrorMessage(
          error.response?.data?.message ||
            "An unexpected error occurred during payment verification"
        );
      }
    };

    handleVerifyPayment();
  }, []);

  const renderStatusContent = () => {
    switch (verificationStatus) {
      case "pending":
        return (
          <div className="flex flex-col items-center space-y-4 text-center">
            <RefreshCw className="animate-spin text-blue-500" size={64} />
            <h2 className="text-2xl font-semibold text-gray-700">
              Verifying Payment
            </h2>
            <p className="text-gray-500">
              Please wait while we confirm your transaction
            </p>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center space-y-4 text-center">
            <CheckCircle className="text-green-500" size={64} />
            <h2 className="text-2xl font-semibold text-green-700">
              Payment Successful
            </h2>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 w-full max-w-md">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-green-800">
                  ${paymentDetails?.amount?.toFixed(2) || "N/A"}
                </span>
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold text-green-800">
                  {paymentDetails?.transactionId || "N/A"}
                </span>
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold text-green-800">
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Continue to Dashboard
            </button>
          </div>
        );

      case "failed":
        return (
          <div className="flex flex-col items-center space-y-4 text-center">
            <XCircle className="text-red-500" size={64} />
            <h2 className="text-2xl font-semibold text-red-700">
              Payment Verification Failed
            </h2>
            <p className="text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
              {errorMessage}
            </p>
            <div className="flex space-x-4">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => (window.location.href = "/retry-payment")}
              >
                Retry Payment
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => (window.location.href = "/support")}
              >
                Contact Support
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Payment Verification
          </h1>
        </div>
        {renderStatusContent()}
      </div>
    </div>
  );
};

export default VerifyPayment;
