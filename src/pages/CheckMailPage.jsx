import { Mail, CheckCircle, AlertTriangle } from 'lucide-react';

const CheckMailPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl max-w-md w-full p-8 text-center space-y-6">
        <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
          <Mail className="text-blue-600 w-12 h-12" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Check Your Email</h1>
          <p className="text-gray-600 mb-6">
            We&apos;ve sent a verification link to your email address. 
            Please check your inbox (and spam folder) to complete the process.
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-4 bg-gray-50 p-4 rounded-lg">
          <CheckCircle className="text-green-500 w-6 h-6" />
          <span className="text-gray-700">Verification email sent successfully</span>
        </div>
        
        <div className="text-sm text-gray-500 space-y-2">
          <p>
            <AlertTriangle className="inline-block mr-2 text-yellow-500 w-4 h-4" />
            Didn&apos;t receive the email? Check your spam folder or 
            <button className="text-blue-600 ml-1 hover:underline">
              resend verification
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