import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UserPlus, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const { register, error, clearError } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    clearError();
  };

  const togglePasswordVisibility = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await register(username, email, password, confirmPassword);
    } catch {
      console.error("Error creating account:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-custom-brown to-custom-brown-light p-6 text-center">
          <UserPlus className="mx-auto text-white w-16 h-16 mb-4" />
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          {/* <p className="text-white/80 mt-2">Join our community today!</p> */}
        </div>

        <div className="p-8">
          {error && (
            <div
              className="mb-6 bg-red-50 border-l-4 border-red-500 p-4"
              role="alert"
            >
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="text-gray-700 text-sm font-semibold mb-2 flex items-center"
              >
                <UserPlus className="mr-2 text-custom-brown" size={18} />
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={handleChange(setUsername)}
                className="w-full border-gray-300 focus:border-custom-brown focus:ring-2 focus:ring-custom-brown/30"
                placeholder="Choose a unique username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className=" text-gray-700 text-sm font-semibold mb-2 flex items-center"
              >
                <Mail className="mr-2 text-custom-brown" size={18} />
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
                className="w-full border-gray-300 focus:border-custom-brown focus:ring-2 focus:ring-custom-brown/30"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-gray-700 text-sm font-semibold mb-2 flex items-center"
              >
                <Lock className="mr-2 text-custom-brown" size={18} />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange(setPassword)}
                  className="w-full border-gray-300 focus:border-custom-brown focus:ring-2 focus:ring-custom-brown/30 pr-10"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="text-gray-700 text-sm font-semibold mb-2 flex items-center"
              >
                <Lock className="mr-2 text-custom-brown" size={18} />
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleChange(setConfirmPassword)}
                  className="w-full border-gray-300 focus:border-custom-brown focus:ring-2 focus:ring-custom-brown/30 pr-10"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-custom-brown text-white py-3 rounded-lg hover:bg-custom-brown-dark transition duration-300 mt-4"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <a
                href="/login"
                className="text-custom-brown ml-1 hover:underline font-semibold"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
