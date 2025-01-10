import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const SendPasswordResetPage = () => {
  const [email, setEmail] = useState("");
  //   const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { SendPasswordResetLink, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Send the password reset link
      await SendPasswordResetLink(email);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    clearError();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-custom-brown rounded-full mb-4">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        {error && (
          <div
            className="mb-6 bg-red-50 border-l-4 border-red-500 p-4"
            role="alert"
          >
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={handleChange(setEmail)}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center items-center bg-custom-brown hover:bg-custom-brown-dark rounded-lg py-3 text-sm font-medium text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-custom-brown transition-colors"
          >
            Return to login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SendPasswordResetPage;
