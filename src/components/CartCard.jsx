import { apiUrl } from "@/api";
import { Minus, Plus, Trash } from "lucide-react";
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
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

const CartCard = ({ item, handleIncrement, handleDecrement }) => {
  const { deleteItem } = useCart();
  const {
    product_image,
    product_name,
    product_id,
    quantity,
    discounted_price,
    id,
    get_total_price,
    product_size: size,
    slug,
  } = item;

  const image = `${apiUrl}${product_image}`;
  return (
    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-100  w-full">
      <div className="flex flex-col sm:flex-row gap-4 group">
        {/* Product Image */}
        <div className="flex justify-center sm:block">
          <img
            src={image}
            alt={product_name}
            className="w-48 h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg object-cover border-2 border-custom-brown/20 p-2"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col space-y-3 w-full">
          {/* Product Name and Price */}
          <Link
            to={`/product/detail/${slug}`}
            className="flex flex-col sm:flex-row justify-between items-start gap-2"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-custom-brown transition w-full group-hover:text-yellow-400">
              {product_name}
            </h3>
            <p className="text-md sm:text-lg font-bold text-custom-brown whitespace-nowrap">
              ₦{discounted_price}
            </p>
          </Link>

          {/* Size and Total Price */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 space-y-2 sm:space-y-0">
            {size ? (
              <p className="bg-gray-100 px-2 py-1 rounded-md">Size: {size}</p>
            ) : (
              <div /> 
            )}
            <p className="font-medium">Total: ₦{get_total_price}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-3 sm:space-y-0">
            {/* Remove Button */}
            <AlertDialog>
              <AlertDialogTrigger className="w-full sm:w-auto">
                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition transform hover:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-400 w-full">
                  <Trash className="w-4 h-4" />
                  <span className="text-sm font-medium">Remove</span>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg font-bold text-gray-800">
                    Remove from cart
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600">
                    Are you sure you want to remove {product_name} from your
                    cart?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="mr-2">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteItem(id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => handleDecrement(product_id, quantity,size)}
                disabled={quantity === 1}
                className={`h-8 w-8 rounded-full flex justify-center items-center transition ${
                  quantity === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-custom-brown text-white hover:bg-custom-brown/90"
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2 font-medium text-gray-800">{quantity}</span>
              <button
                onClick={() => handleIncrement(product_id, quantity,size)}
                className="h-8 w-8 rounded-full bg-custom-brown text-white flex justify-center items-center hover:bg-custom-brown/90 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartCard.propTypes = {
  item: PropTypes.shape({
    product_image: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    product_id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    discounted_price: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    get_total_price: PropTypes.number.isRequired,
    product_size: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
};

export default CartCard;
