import { apiUrl } from "@/api";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Minus, Plus, Star, Heart, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";

const ProductDetails = () => {
  const {
    fetchProductDetail,
    currentProduct,
    addWishList,
    fetchWishList,
    deleteWishList,
    isLoading,
  } = useProducts();

  const { addToCart, updateCart, cart } = useCart();
  const { isAuthenticated } = useAuth();
  const { slug } = useParams();

  // States
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistedSize, setWishlistedSize] = useState(null);
  const [showWishlistSizeDialog, setShowWishlistSizeDialog] = useState(false);
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [loadingSizes, setLoadingSizes] = useState({});

  const {
    id,
    name,
    image,
    is_available: inStock,
    price,
    discounted_price,
    description,
    sizes = [],
    product_type,
  } = currentProduct;

  const img = `${apiUrl}${image}`;


  useEffect(() => {
    fetchProductDetail(slug);
    
    if (id) {
      getWishlistStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, id]);

  const getWishlistStatus = async () => {
    if (!isAuthenticated) return;
    setIsLoadingWishlist(true);
    if (!isAuthenticated) return;
    try {
      const data = await fetchWishList();
      const wishlistedProduct = isProductInWishlist(id, data);
      setIsWishlisted(wishlistedProduct?.found || false);
      setWishlistedSize(wishlistedProduct?.product?.size || null);
    } catch (error) {
      console.error("Error fetching wishlist status:", error);
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  function isProductInWishlist(productId, wishlistData) {
    const nonSizedProduct = wishlistData.items.find(
      (item) => item.product.id === productId && !item.size
    );

    if (nonSizedProduct) {
      return { found: true };
    }

    const sizedProduct = wishlistData.items.find(
      (item) => item.product.id === productId && item.size
    );

    if (sizedProduct) {
      return {
        found: true,
        product: { size: sizedProduct.size },
      };
    }

    return { found: false };
  }

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      toast.error("You need to sign in to add items to your wishlist.");
      return;
    }
    if (isWishlisted) {
      handleRemoveFromWishlist();
    } else if (product_type === "sized") {
      setShowWishlistSizeDialog(true);
    } else {
      handleAddToWishlist();
    }
  };

  const handleAddToWishlist = async (size = null) => {
    try {
      setIsLoadingWishlist(true);
      await addWishList(id, size);
      setIsWishlisted(true);
      setWishlistedSize(size);
      toast.success("Added to wishlist");
      setShowWishlistSizeDialog(false);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to add to wishlist");
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!isAuthenticated) return;
    await deleteWishList(id, wishlistedSize);
    setIsWishlisted(false);
    setWishlistedSize(null);
  };

  const getQuantityFromCart = (size) => {
    const cartItem = cart.find(
      (item) => item.product_id === id && item.product_size === size
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleQuantityChange = async (size, change) => {
    const currentQty = getQuantityFromCart(size);
    // const newQty = Math.max(0, currentQty + change);

    try {
      setLoadingSizes((prev) => ({ ...prev, [size]: true }));

      if (change > 0) {
        await addToCart(id, 1, size, currentProduct);
      } else if (change < 0 && currentQty > 0) {
        const updateQuantity = currentQty + change;
        await updateCart(id, updateQuantity, size);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    } finally {
      setLoadingSizes((prev) => ({ ...prev, [size]: false }));
    }
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => {
      if (item.product_id === id) {
        return total + item.quantity;
      }
      return total;
    }, 0);
  };

  const handleAddToCart = () => {
  
    if (product_type === "sized") {
      setShowSizeDialog(true);
    } else {
      addToCart(id, 1, null, currentProduct);
    }
  };

  const handleQuantityUpdate = (change) => {
    if (product_type === "sized") {
      setShowSizeDialog(true);
    } else {
      const currentQty = getTotalQuantity();
      const newQty = Math.max(0, currentQty + change);
      updateCart(id, newQty, null);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
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
          <div className="bg-white rounded-xl shadow-md p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                {name}
              </h2>
              <Button
                onClick={handleWishlistClick}
                disabled={isLoadingWishlist}
                className="p-2 rounded-full hover:bg-gray-100/50 transition-colors duration-200 disabled:opacity-50"
              >
                <Heart
                  className={`w-6 h-6 transition-all duration-200 
                    ${
                      isWishlisted
                        ? "text-red-500 fill-current"
                        : "text-gray-400"
                    }
                  `}
                />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="flex text-amber-500 mr-2">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">(4.0)</span>
              </div>

              <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                In Stock
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

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                + shipping from ₦250 to ISOLO
              </p>
            </div>

            {getTotalQuantity() > 0 ? (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleQuantityUpdate(-1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-semibold">
                  {getTotalQuantity()}
                </span>
                <button
                  onClick={() => handleQuantityUpdate(1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button
                className={`w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
                  inStock
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!inStock}
                onClick={handleAddToCart}
              >
                {product_type === "sized" ? "Select Sizes" : "Add to Cart"}
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Product Description
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </section>

      {/* Wishlist Size Dialog */}
      <Dialog
        open={showWishlistSizeDialog}
        onOpenChange={setShowWishlistSizeDialog}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Available Sizes</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 py-4">
            {sizes.map((size) => (
              <Button
                key={size.size}
                onClick={() => handleAddToWishlist(size.size)}
                className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                disabled={isLoadingWishlist}
              >
                {size.size}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Size Selection Dialog with Quantity Controls */}
      <Dialog open={showSizeDialog} onOpenChange={setShowSizeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Sizes and Quantities</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {sizes.map((size) => (
              <div
                key={size.size}
                className="flex items-center justify-between p-4 border-b"
              >
                <span className="text-lg font-medium">{size.size}</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(size.size, -1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    disabled={
                      getQuantityFromCart(size.size) === 0 ||
                      loadingSizes[size.size]
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold w-8 text-center relative">
                    {loadingSizes[size.size] ? (
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    ) : (
                      getQuantityFromCart(size.size)
                    )}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(size.size, 1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    disabled={loadingSizes[size.size]}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter className="flex gap-4">
            <Button
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
              onClick={() => setShowSizeDialog(false)}
            >
              Continue Shopping
            </Button>
            {getTotalQuantity() > 0 && (
              <Link
                to="/cart"
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded text-center"
              >
                Go to Cart
              </Link>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetails;
