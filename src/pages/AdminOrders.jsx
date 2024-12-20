import { useEffect, useState } from "react";
import { Search,  ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminOrders = () => {
  // Sample order data from API
  const { adminOrders } = useCart();
  const [ordersData, setOrdersData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const navigate = useNavigate();

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  console.log(statusFilter);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      try {
        const data = await adminOrders({ currentPage, statusFilter,searchTerm });

        setOrdersData(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, statusFilter, searchTerm]);

  function handleNavigate(reference) {
    navigate(`/admin/order/${reference}`);
  }

  // Status color mapping
  const statusColors = {
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const totalPages = Math.ceil(ordersData.count / 8);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="p-6 border-b flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-800 w-full md:w-auto text-center md:text-left">
            Order Management
          </h1>

          {/* Search and Filter Container */}
          <div className="flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4 items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search by Order ID, Name, Email,"
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); 
                }}
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="abandoned">Abandoned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12 text-gray-500">
            <p>Loading orders...</p>
          </div>
        )}

        {/* Order Table for Desktop */}
        {!isLoading && (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm">
                    <th className="p-4 text-left">Order ID</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-center">Items</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.results.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleNavigate(order.reference)}
                    >
                      <td className="p-4 font-medium text-gray-700">
                        {order.reference}
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{order.username}</div>
                        <div className="text-sm text-gray-500">
                          {order.email}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-center text-gray-600">
                        {order.orders.length}
                      </td>
                      <td className="p-4 text-right font-medium">
                        ${order.total_amount}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Order Cards */}
            <div className="md:hidden">
              {ordersData.results.map((order, index) => (
                <div
                  key={index}
                  className="p-4 border-b flex flex-col space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{order.reference}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{order.username}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span className="font-medium">${order.total_amount}</span>
                  </div>
                  <div className="text-center text-gray-600">
                    Items: {order.orders.length}
                  </div>
                </div>
              ))}
            </div>

            {/* No Orders State */}
            {ordersData.results.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-xl">No orders found</p>
                <p className="mt-2">Try adjusting your search or filter</p>
              </div>
            )}

            {/* Pagination Controls */}
            {ordersData.count > 0 && (
              <div className="flex justify-between items-center p-4 border-t">
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
