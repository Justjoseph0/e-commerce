import { ShoppingBag } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/collections");
  }
  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/60" />
      <div className="relative mx-auto max-w-7xl h-full flex items-center px-6 lg:px-8">
        <div className="flex flex-col max-w-xl space-y-8">
          <span className="text-gray-300 text-sm tracking-wider uppercase">
            New Collection
          </span>
          <h2 className="text-4xl lg:text-6xl font-light text-white leading-tight">
            Elevate Your <br />
            <span className="font-medium">Professional Wardrobe</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Discover our curated collection of timeless essentials, crafted with
            precision for the modern professional.
          </p>
          <div className="flex gap-4 pt-4">
            <Button
            onClick={handleNavigate}
              className="md:px-8 py-4 bg-white text-gray-900 rounded-md 
              text-sm font-medium tracking-wide transform transition-all 
              duration-200 hover:bg-gray-100 inline-flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop Collection
            </Button>
            <Button
              className="md:px-8 py-4 border border-white/30 text-white rounded-md 
              text-sm font-medium tracking-wide transform transition-all 
              duration-200 hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
