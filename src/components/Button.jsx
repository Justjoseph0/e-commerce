
// eslint-disable-next-line react/prop-types
const Button = ({ onClick, children, className, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 transition duration-300 ease-in-out transform hover:scale-95 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
