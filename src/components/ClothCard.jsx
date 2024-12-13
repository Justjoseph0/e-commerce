import { apiUrl } from "@/api";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; 
const ClothCard = ({ cloth }) => {
  const { 
    name, 
    image, 
    is_available: inStock, 
    price, 
    discounted_price,
    slug 
  } = cloth;

  const img = `${apiUrl}${image}`;

  return (
    <Link 
      to={`/product/detail/${slug}`}
      className="group relative block transform transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-sm border border-custom-brown bg-white shadow-sm">
        {/* Image Container */}
        <div className="relative h-[350px] w-full overflow-hidden">
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
              <span className="text-2xl font-bold text-white backdrop-blur-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="px-4 py-4 bg-custom-beige rounded-b-xl border-t-2 border-custom-brown">
          <div className="flex flex-col space-y-2">
            <h4 className="text-lg text-custom-brown truncate">
              {name}
            </h4>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-normal text-black">
                ₦{discounted_price}
              </span>
              
              <span className="text-sm font-normal text-gray-500 line-through">
                ₦{price}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
    </Link>
  );
};

ClothCard.propTypes = {
  cloth: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    is_available: PropTypes.bool.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    discounted_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default ClothCard;