import { apiUrl } from "@/api";
import Button from "./Button";
import { Edit, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const {
    name,
    image,
    is_available: inStock,
    price,
    discounted_price,
    category_name,
    quantity,
    slug,
  } = product;

  const img = `${apiUrl}${image}`;

  return (
    <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      <div className="relative group">
        {/* Image Container with Aspect Ratio and Overlay */}
        <div className="relative w-full pb-[100%] overflow-hidden">
          <img
            src={img || "/placeholder-image.png"}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              onClick={() => onEdit?.(product)}
              title="Edit Product"
            >
              <Edit size={20} className="text-gray-700" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-red-500/80 hover:bg-red-600 rounded-full p-2 shadow-md"
                  title="Delete Product"
                >
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete{" "}
                    {name}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete?.(slug)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Availability and Category Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          {!inStock && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}
          <div className="ml-auto bg-white/80 text-xs px-2 py-1 rounded-full text-gray-700">
            {category_name}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {discounted_price ? (
              <>
                <span className="text-red-600 font-bold text-lg">
                  ₦{discounted_price}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  ₦{price}
                </span>
              </>
            ) : (
              <span className="text-blue-600 font-bold text-lg">${price}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Stock:
            <span
              className={`ml-1 font-semibold ${
                quantity <= 5 ? "text-red-600" : "text-green-600"
              }`}
            >
              {quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    is_available: PropTypes.bool,
    price: PropTypes.number.isRequired,
    discounted_price: PropTypes.number,
    description: PropTypes.string,
    category_name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ProductCard;
