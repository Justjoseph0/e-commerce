import { Link } from 'react-router-dom';
import { Lock, Home } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-red-500 text-white p-6 text-center">
          <Lock className="mx-auto mb-4" size={64} />
          <h1 className="text-3xl font-bold">Unauthorized Access</h1>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-6 text-lg">
            You do not have permission to access this page. 
            Please contact your administrator if you believe this is an error.
          </p>
          
          <div className="flex flex-col space-y-4">
            <Link 
              to="/login" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <Lock className="mr-2" size={20} />
              Go to Login
            </Link>
            
            <Link 
              to="/" 
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
            >
              <Home className="mr-2" size={20} />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;