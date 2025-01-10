import PropTypes from "prop-types";
import { AlertCircle } from "lucide-react";
import Button from "./Button";

const ErrorMessage = ({ message, errorMessageText, onRetry }) => {
  return (
    <section className="lg:px-10 px-4 md:py-28 py-16">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
        <div>
          <h3 className="text-red-800 font-medium">Unable to load {message}</h3>
          <p className="text-red-600 text-sm mt-1">
            {errorMessageText ||
              "Please try again later or contact support if the problem persists."}
          </p>
          <Button
            onClick={onRetry}
             className="mt-3 text-sm font-medium text-red-600 hover:text-red-800 transition-colors border border-red-600 rounded-lg py-2 px-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    </section>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  errorMessageText: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
