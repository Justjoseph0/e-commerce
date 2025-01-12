import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, error, clearError } = useAuth();

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    clearError();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900/90 to-gray-900/60 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-center">
          <LogIn className="mx-auto text-white w-16 h-16 mb-4 opacity-90" />
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-white/90 mt-2">Login to your account</p>
        </div>

        <div className="p-8">
          {/* Error Alert */}
          {error && (
            <div
              className="mb-6 bg-red-50 border-l-4 border-red-500 p-4"
              role="alert"
            >
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-gray-700 text-sm font-semibold mb-2 flex items-center"
              >
                <Mail className="mr-2 text-gray-900" size={18} />
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
                className="w-full border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 rounded-lg"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="text-gray-700 text-sm font-semibold mb-2 flex items-center"
              >
                <Lock className="mr-2 text-gray-900" size={18} />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange(setPassword)}
                  className="w-full border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 rounded-lg pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300 mt-6 font-medium shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging In...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Links Section */}
          <div className="mt-8 text-center space-y-4">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-900 hover:text-gray-700 font-semibold transition duration-200"
            >
              Forgot Password?
            </Link>

            <p className="text-sm text-gray-600 mt-4">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-gray-900 hover:text-gray-700 ml-1 font-semibold transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
