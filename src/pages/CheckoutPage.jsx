import { useState } from "react";
import {
  MapPin,
  User,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { apiUrl } from "@/api";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const { cart,checkout } = useCart();

  console.log(cart);


  const handleSubmit = async (e) => {
    e.preventDefault()

    // if(!formData.email){
    //     alert('ejejejej')
    //     return
    // }

    await checkout()
  }
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subTotal = cart.reduce((acc, item) => acc + item.get_total_price, 0);


  const shipping = subTotal > 100 ? 0 : 12.99;

  const tax = subTotal * 0.08;

  const total = subTotal + shipping + tax;

//   const removeCartItem = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const calculateSubtotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const shipping = subtotal > 100 ? 0 : 12.99;
//     const tax = subtotal * 0.08; // 8% tax rate
//     return subtotal + shipping + tax;
//   };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-6">
            <ShoppingCart className="mr-3 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2 text-blue-500" /> Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-2 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2 text-green-500" /> Shipping Address
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                className="col-span-2 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="col-span-2 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <ShoppingCart className="mr-3 text-blue-600" /> Order Summary
          </h3>

          {/* Cart Items */}
          <div className="space-y-4 mb-6 border-b pb-6">
            {cart.map((item) => (
                
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={`${apiUrl}${item.product_image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-4">
                    ${item.get_total_price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Calculation */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax}</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-2">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
            <CheckCircle className="mr-2" /> Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
