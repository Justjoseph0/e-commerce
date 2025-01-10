
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash } from 'lucide-react';
import PropTypes from 'prop-types';
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
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { apiUrl } from '@/api';

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
    <Card className="group transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Product Image */}
          <Link to={`/product/detail/${slug}`} className="shrink-0">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt={product_name}
                className="w-full sm:w-40 sm:h-40 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 flex flex-col space-y-4">
            {/* Product Name and Price */}
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <Link 
                to={`/product/detail/${slug}`}
                className="group/link"
              >
                <h3 className="text-lg font-semibold text-gray-800 group-hover/link:text-amber-600 transition-colors">
                  {product_name}
                </h3>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-amber-600">
                  ₦{Number(discounted_price).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Size and Total */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {size && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                  Size: {size}
                </span>
              )}
              <span className="px-3 py-1 bg-amber-50 rounded-full text-amber-700 font-medium">
                Total: ₦{get_total_price.toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              {/* Quantity Controls */}
              <div className="flex items-center bg-gray-50 rounded-full p-1 border shadow-sm">
                <button
                  onClick={() => handleDecrement(product_id, quantity, size)}
                  disabled={quantity === 1}
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                    quantity === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium text-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={() => handleIncrement(product_id, quantity, size)}
                  className="h-8 w-8 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Remove Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
                  >
                    <Trash className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:max-w-[425px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove from cart</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove {product_name} from your cart?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteItem(id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
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