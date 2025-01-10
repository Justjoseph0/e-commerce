import Loading from "@/components/Loading";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { userOrders, isLoading } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersData, setOrdersData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });


  // console.log(userOrders);
  

  async function getUserOrders() {
    try {
      const data = await userOrders(currentPage);
      
      if (!Array.isArray(data.results)) throw new Error("Invalid response data");

      const ordersWithTotalPrice = data.results?.map((order) => ({
        ...order,
        total_amount: order.orders.reduce(
          (sum, item) => sum + parseFloat(item.total_price),
          0
        ),
      }));

      setOrdersData({
        count: data.count || ordersWithTotalPrice.length,
        next: data.next,
        previous: data.previous,
        results: ordersWithTotalPrice,
      });
      setOrders(ordersWithTotalPrice);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders. Please try again.");
    }
  }

  useEffect(() => {
    getUserOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const totalPages = Math.ceil(ordersData.count / 8);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          Start shopping to see your orders here
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.reference}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            {/* Parent Order Information */}
            <div className="p-4 bg-gray-50 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-700">
                  Reference: {order.reference}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.created_at).toLocaleDateString()} -{" "}
                  {new Date(order.created_at).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span className={`font-medium ${order.status === 'pending' ? 'text-orange-400' : 'text-green-600'}`}>
                    {order.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="font-bold text-xl">
                  Total: ${parseFloat(order.total_amount).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Child Orders Information */}
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Product</th>
                    <th className="text-center py-2">Quantity</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orders.map((item) => (
                    <tr key={item.id} className="border-b last:border-b-0">
                      <td className="py-2">{item.product_name}</td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-right py-2">
                        ${parseFloat(item.price).toFixed(2)}
                      </td>
                      <td className="text-right py-2">
                        ${parseFloat(item.total_price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        {ordersData.count > 0 && (
          <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
            {/* Page Info */}
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * 8 + 1} to{" "}
              {Math.min(currentPage * 8, ordersData.count)} results of{" "}
              {ordersData.count} orders
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!ordersData.previous}
                className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-8 h-8 rounded-md ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 border"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!ordersData.next}
                className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;