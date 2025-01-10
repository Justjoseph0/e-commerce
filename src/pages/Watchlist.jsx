import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash2, AlertCircle } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { apiUrl } from "@/api";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/useCart";
import Loading from "@/components/Loading";

const Watchlist = () => {
  const { fetchWishList, deleteWishList } = useProducts();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = (slug) => {
    navigate(`/product/detail/${slug}`);
  };

  async function getWishList() {
    setLoading(true);
    try {
      const data = await fetchWishList();
      console.log(data.items);
      setProducts(data.items);
    }
    catch (error) {
      console.error("Error fetching wish list:", error);
    }finally {
      setLoading(false);
    }
  }

  const handleDeleteWishList = async (item) => {
    try {
      const { size } = itemToDelete;
      const { id } = itemToDelete.product;

      console.log("Deleting item:", size, id);
      
      console.log("Deleting item:", item);
      console.log("Item to delete:", itemToDelete);

      await deleteWishList(id, size);
      await getWishList();
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const openDeleteDialog = (item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleAddToCart = (item) => {
    const { id } = item.product;
    const { size } = item;

    addToCart(id, 1, size);
  };
  useEffect(() => {
    getWishList();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-custom-brown">My Watchlist</h1>
        <p className="text-gray-500">Track your favorite items</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item, i) => (
          <Card key={i} className="bg-white overflow-hidden">
            <CardContent className="p-0">
              {/* Product Image Section */}
              <div
                onClick={() => handleNavigate(item.product.slug)}
                className="relative cursor-pointer"
              >
                <img
                  src={`${apiUrl}${item.product.image}`}
                  alt={item.product.name}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Product Info Section */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-medium text-lg text-gray-800 line-clamp-2">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.product.category_name}
                  </p>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-orange-500">
                      ${item.product.discounted_price}
                    </span>
                    {item.size && (
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Size: {item.size}
                      </span>
                    )}
                  </div>

                  {item.product.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.floor(item.product.rating))}
                        {"☆".repeat(5 - Math.floor(item.product.rating))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({item.product.reviews || 0})
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.product.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-2 px-4 rounded flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>

                  <button
                    onClick={() => openDeleteDialog(item)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove from Watchlist</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove &quot;{itemToDelete?.product.name}
              &quot; from your watchlist?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteWishList(itemToDelete?.product)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </DialogContent>
      </Dialog>

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
