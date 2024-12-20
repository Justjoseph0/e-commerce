import { Link, useNavigate } from "react-router-dom";
import CartCard from "@/components/CartCard";
import Loading from "@/components/Loading";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { cart, updateCart, isLoading } = useCart();
  const navigate = useNavigate()

  const subTotal = cart.reduce((acc, item) => acc + item.get_total_price, 0);

  console.log(cart);
  

  const handleIncrement = (productId, currentQuantity,size) => {
    updateCart(productId, currentQuantity + 1,size);
  };

  const handleDecrement = (productId, currentQuantity,size) => {
    updateCart(productId, currentQuantity - 1,size);
  };

  // if (isLoading) return <Loading />;

  return (
    <section className="">
      <div className="max-w-7xl mx-auto">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-y-2 text-custom-brown bg-white shadow-md py-4 px-4">
            <img
              src="emptycart.svg"
              alt="empty cart"
              className="mx-auto mb-4 w-64 md:h-64 h-32 object-contain"
            />
            <h2 className="md:text-2xl text-lg font-semibold text-gray-800 mb-4">
              Your cart is empty!
            </h2>
            <p className="text-gray-600 mb-6">
              Browse our categories and discover our best deals!
            </p>
            <Link
              to="/collections"
              className="inline-block bg-amber-600 text-white md:px-8 px-4 text-sm md:text-base py-3 rounded-lg  hover:bg-amber-700 transform ease-in-out duration-300 shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Your Cart
                </h2>
                <span className="text-gray-500">
                  {cart.length} item{cart.length !== 1 && "s"}
                </span>
              </div>
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₦{subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-semibold border-t pt-4">
                  <span>Total</span>
                  <span>₦{subTotal.toFixed(2)}</span>
                </div>
                <button
                onClick={() => navigate('/checkout')}
                  className="w-full bg-amber-600 text-white py-3 rounded-lg 
                             hover:bg-amber-700 transition-colors duration-300 
                             transform hover:-translate-y-1 shadow-md mt-4"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
