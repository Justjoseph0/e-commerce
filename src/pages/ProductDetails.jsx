import { apiUrl } from "@/api";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";

const ProductDetails = () => {
  const { fetchProductDetail, currentProduct } = useProducts();
  const { addToCart, updateCart, cart } = useCart();
  const { slug } = useParams();
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    fetchProductDetail(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  console.log(currentProduct);

  const {
    id,
    name,
    image,
    is_available: inStock,
    price,
    discounted_price,
    description,
    product_type,
  } = currentProduct;

  console.log(currentProduct);

  const cartItem = cart.find((item) => item.product_id === id);
  const img = `${apiUrl}${image}`;

  useEffect(() => {
    setQuantity(0);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    if (product_type === "sized") {
      if (!selectedSize) {
        toast.error("Please select a size!");
        return;
      }
    }

    addToCart(id, 1, selectedSize, currentProduct);
    setQuantity(1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQty = prev + 1;
      updateCart(id, newQty);
      return newQty;
    });
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      const newQty = prev - 1;
      updateCart(id, newQty);
      return newQty;
    });
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center">
          <img
            src={img}
            alt={name}
            className="max-w-full h-auto object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize mb-4">
            {name}
          </h2>

          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <div className="flex items-center mb-2 sm:mb-0">
              <div className="flex text-amber-500 mr-2">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-500 text-sm">(4.0)</span>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <span className="text-2xl md:text-3xl font-bold text-amber-600">
                ₦{discounted_price}
              </span>
              <span className="text-gray-500 line-through">₦{price}</span>
            </div>
          </div>

          {product_type == "sized" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Size</label>
              <Select onValueChange={handleSizeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose Size" />
                </SelectTrigger>
                <SelectContent>
                  {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                    <SelectItem key={size} value={size.toUpperCase()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              + shipping from ₦250 to ISOLO
            </p>
          </div>
          <Button
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
              inStock
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Product Description
        </h3>
        <p className="text-custom-brown leading-relaxed">{description}</p>
      </div>
    </section>
  );
};

export default ProductDetails;
