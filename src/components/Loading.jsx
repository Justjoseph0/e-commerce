
const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50 min-h-screen">
      <div className="w-12 h-12 border-4 border-black border-dotted border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
