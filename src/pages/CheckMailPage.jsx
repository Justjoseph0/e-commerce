import { Mail, CheckCircle, AlertTriangle } from "lucide-react";

// eslint-disable-next-line react/prop-types
const CheckMailPage = ({ type }) => {
  const title =
    type === "activate" ? "Activate Your Account" : "Check Your Email";
  const message =
    type === "activate"
      ? "We’ve sent an account activation link to your email address. Please check your inbox (and spam folder) to complete the process."
      : "We’ve sent a password reset link to your email address. Please check your inbox (and spam folder) to reset your password.";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white drop-shadow-md rounded-xl max-w-md w-full p-8 text-center space-y-6">
        <div className="bg-custom-brown rounded-full w-24 h-24 flex items-center justify-center mx-auto">
          <Mail className="text-white w-12 h-12" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{message}</p>
        </div>

        <div className="flex items-center justify-center space-x-4 bg-gray-50 p-4 rounded-lg">
          <CheckCircle className="text-green-500 w-6 h-6" />
          <span className="text-gray-700">
            {type === "activate"
              ? "Activation email sent successfully"
              : "Password reset email sent successfully"}
          </span>
        </div>

        <div className="text-sm text-gray-500 space-y-2">
          <p>
            <AlertTriangle className="inline-block mr-2 text-yellow-500 w-4 h-4" />
            Didn&apos;t receive the email? Check your spam folder or
            <button className="text-blue-600 ml-1 hover:underline">
              resend{" "}
              {type === "activate" ? "activation link" : "password reset link"}
            </button>
          </p>
        </div>

        <div className="border-t pt-4 mt-4">
          <p className="text-gray-500">
            Still having trouble?
            <a href="/support" className="text-blue-600 ml-1 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckMailPage;
