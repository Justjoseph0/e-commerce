import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash2, AlertCircle } from "lucide-react";

const Watchlist = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Nike Air Max 270",
      image: "/api/placeholder/200/200",
      price: "₦45,500",
      stock: true,
      seller: "Nike Official Store",
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      name: "Samsung Galaxy A54",
      image: "/api/placeholder/200/200",
      price: "₦225,000",
      stock: true,
      seller: "Samsung Store",
      rating: 4.8,
      reviews: 256,
    },
    {
      id: 3,
      name: "PS5 DualSense Controller",
      image: "/api/placeholder/200/200",
      price: "₦49,999",
      stock: false,
      seller: "GameStation NG",
      rating: 4.6,
      reviews: 89,
    },
  ]);

  const removeFromWatchlist = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-lg  mb-4">
        <h1 className="text-2xl font-bold text-custom-brown">My Watchlist</h1>
        <p className="text-gray-500">Track your favorite items</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="bg-white overflow-hidden">
            <CardContent className="p-0">
              {/* Product Image Section */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Product Info Section */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-medium text-lg text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.seller}</p>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-orange-500">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    className={`w-full py-2 px-4 rounded flex items-center justify-center gap-2 ${
                      product.stock
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!product.stock}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock ? "Add to Cart" : "Out of Stock"}
                  </button>

                  <button
                    onClick={() => removeFromWatchlist(product.id)}
                    className="w-full py-2 px-4 rounded flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Your watchlist is empty
          </h3>
          <p className="text-gray-500">
            Start adding items to track their prices and availability
          </p>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
