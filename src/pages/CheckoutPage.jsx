import { useEffect, useState } from "react";
import { MapPin, ShoppingCart, CheckCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { apiUrl } from "@/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Button from "@/components/Button";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", 
  "Bayelsa", "Benue", "Borno", "Cross River", "Delta", 
  "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", 
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", 
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", 
  "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", 
  "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const { cart, checkout } = useCart();
  const { getUserAddress, addAddress } = useAuth();

  async function getDefaultAddress() {
    try {
      const addresses = await getUserAddress();
      const defaultAddr = addresses.find(addr => addr.is_default);
      // console.log(defaultAddr.id);
      
      setDefaultAddress(defaultAddr);
    } catch (error) {
      console.error("Error fetching default address:", error);
      toast.error("Failed to fetch address");
    }
  }

  useEffect(() => {
    getDefaultAddress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateForm = () => {
    if (!formData.firstName) {
      toast.error('First name is required');
      return false;
    }
    if (!formData.lastName) {
      toast.error('Last name is required');
      return false;
    }
    if (!formData.phone) {
      toast.error('Phone number is required');
      return false;
    }
    if (!formData.streetAddress) {
      toast.error('Street address is required');
      return false;
    }
    if (!formData.city) {
      toast.error('City is required');
      return false;
    }
    if (!formData.state) {
      toast.error('State is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form only if there's no default address
    if (!defaultAddress && !validateForm()) return;
  
    setIsLoading(true);
  
    try {
      let activeAddress = defaultAddress;
  
      if (!defaultAddress) {
        // Create the address data object
        const addressData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phone,
          street_address: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          postal_code: formData.zipCode,
          country: "Nigeria"
        };
  
        // Add the address
        const response = await addAddress(addressData);
  
        if (response.error) {
          toast.error(response.error); // Notify if there's an error
          return;
        }
  
        // Fetch and set the default address after creating it
        activeAddress = await getDefaultAddress();
        if (!activeAddress) {
          toast.error("Failed to retrieve the default address");
          return;
        }
      }
  
      // Proceed to checkout with the default or newly created address
      await checkout(activeAddress.id);
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error("Failed to process checkout");
    } finally {
      setIsLoading(false); // Stop the loading state
    }
  };
  

  console.log(defaultAddress);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subTotal = cart.reduce((acc, item) => acc + item.get_total_price, 0);
  const shipping = subTotal > 100 ? 0 : 12.99;
  const tax = Number((subTotal * 0.08).toFixed(2));
  const total = Number((subTotal + shipping + tax).toFixed(2));


 
  return (
    <div className="mx-auto max-w-7xl py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6 h-fit">
          <div className="flex items-center mb-6">
            <ShoppingCart className="mr-3 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2 text-green-500" /> Delivery Address
            </h3>

            {defaultAddress ? (
              <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {defaultAddress.first_name} {defaultAddress.last_name}
                    </p>
                    <p className="text-gray-600">{defaultAddress.phone_number}</p>
                    <p className="text-gray-600">{defaultAddress.street_address}</p>
                    <p className="text-gray-600">
                      {defaultAddress.city}, {defaultAddress.state}
                    </p>
                    <p className="text-gray-600">{defaultAddress.postal_code}</p>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">
                    Default
                  </span>
                </div>
              </div>
            ) : (
              <form className="grid grid-cols-2 gap-4">
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="First Name"
                  required
                />
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="Last Name"
                  required
                />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="Phone Number"
                  required
                />
                <Input
                  type="text"
                  name="streetAddress"
                  placeholder="Street Address"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <Select
                  name="state"
                  value={formData.state}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      state: value,
                    }));
                  }}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {NIGERIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </form>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <ShoppingCart className="mr-3 text-blue-600" /> Order Summary
          </h3>

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
                  <p className="font-semibold mr-4">${item.get_total_price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:bg-blue-400"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="mr-2" /> Complete Purchase
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;