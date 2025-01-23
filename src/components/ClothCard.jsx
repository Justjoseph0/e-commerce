import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { cloudinaryBaseUrl } from "@/api";

const ClothCard = ({ cloth }) => {
  const {
    name,
    image,
    is_available: inStock,
    price,
    discounted_price,
    slug
  } = cloth;


  console.log(cloth);
  

  const img = `${cloudinaryBaseUrl}${image}`;

  
  const discount = price && discounted_price 
    ? Math.round(((price - discounted_price) / price) * 100)
    : 0;

  return (
    <Link
      to={`/product/detail/${slug}`}
      className="block transform transition-all duration-300 hover:-translate-y-1"
    >
      <Card className="relative overflow-hidden bg-white">
        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute left-4 top-4 z-10 bg-red-600 text-white">
            -{discount}%
          </Badge>
        )}

        {/* Quick Action Buttons */}
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-100">
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
          <button className="rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <span className="text-lg font-semibold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-3 p-4">
          <h3 className="line-clamp-2 min-h-[3rem] text-lg font-medium text-gray-800">
            {name}
          </h3>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-gray-900">
                ₦{discounted_price?.toLocaleString()}
              </span>
              {discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ₦{price?.toLocaleString()}
                </span>
              )}
            </div>
            {inStock && (
              <Badge className="bg-green-100 text-green-800">
                In Stock
              </Badge>
            )}
          </div>
        </div>
      </Card>
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