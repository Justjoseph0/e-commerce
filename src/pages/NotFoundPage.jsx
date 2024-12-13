import { Link } from "react-router-dom";

const NotFoundPage = () => {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mt-4 text-2xl text-gray-600">Page Not Found</h2>
      <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
      <Link
      to={'/'}
        className="block mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;