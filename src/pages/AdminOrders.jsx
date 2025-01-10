import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Truck,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const { adminOrders, updateDeliveryStatus } = useCart();
  const [ordersData, setOrdersData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [currentReference, setCurrentReference] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  console.log(ordersData.results);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      try {
        const data = await adminOrders({
          currentPage,
          statusFilter,
          searchTerm,
        });
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

  const statusColors = {
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const deliveryStatusInfo = {
    Processing: {
      color: "bg-blue-100 text-blue-800",
      icon: <Truck className="inline-block w-4 h-4 mr-1" />,
    },
    Shipped: {
      color: "bg-purple-100 text-purple-800",
      icon: <Truck className="inline-block w-4 h-4 mr-1" />,
    },
    Delivered: {
      color: "bg-green-100 text-green-800",
      icon: <Truck className="inline-block w-4 h-4 mr-1" />,
    },
    Pending: {
      color: "bg-gray-100 text-gray-800",
      icon: <Truck className="inline-block w-4 h-4 mr-1" />,
    },
  };

  const totalPages = Math.ceil(ordersData.count / 8);

  const handleDeliveryStatusUpdate = async () => {
    try {
      if (!currentId) return;
      const res = await updateDeliveryStatus(currentId, selectedStatus);
      setIsOpen(false);
      setSelectedStatus(null);
      setCurrentId(null);
      console.log(res);

      if (!res.status === 200) return;

      const updatedOrders = ordersData.results.map((order) =>
        order.id === currentId
          ? { ...order, delivery_status: selectedStatus }
          : order
      );
      setOrdersData((prev) => ({ ...prev, results: updatedOrders }));
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDialogOpen = (status, reference, id, paymentStatus) => {
    if (paymentStatus !== "success") {
      toast.error('Only orders with a payment status of successful can be updated')
      return
    } 
    setSelectedStatus(status);
    setIsOpen(true);
    setCurrentReference(reference);
    setCurrentId(id);
  };

  const DeliveryStatusCell = ({ order }) => {
    const stopPropagation = (e) => e.stopPropagation();
    const { id, delivery_status, reference, status: paymentStatus } = order;

    return (
      <>
        <td className="p-4 text-center" onClick={stopPropagation}>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-between ${
                  deliveryStatusInfo[order.delivery_status || "Pending"]?.color
                } cursor-pointer hover:opacity-80 transition-opacity w-32`}
              >
                <span className="flex items-center">
                  {deliveryStatusInfo[order.delivery_status || "Pending"]?.icon}
                  {order.delivery_status || "Pending"}
                </span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {Object.keys(deliveryStatusInfo).map((status) => (
                <DropdownMenuItem
                  key={status}
                  className={`flex items-center ${
                    delivery_status === status ? "bg-gray-100" : ""
                  }`}
                  onClick={() =>
                    handleDialogOpen(status, reference, id, paymentStatus)
                  }
                >
                  {deliveryStatusInfo[status].icon}
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </>
    );
  };

  DeliveryStatusCell.propTypes = {
    order: PropTypes.shape({
      delivery_status: PropTypes.string,
      id: PropTypes.number,
      reference: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-6 border-b flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-800 w-full md:w-auto text-center md:text-left">
            Order Management
          </h1>

          <div className="flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4 items-center">
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search by Order ID, Name, Email"
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

        {isLoading && (
          <div className="text-center py-12 text-gray-500">
            <p>Loading orders...</p>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm font-medium">
                    <th className="p-4 text-left">Order ID</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-center">Items</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Delivery Status</th>
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
                      <td className="p-4 text-center capitalize">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <DeliveryStatusCell order={order} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              {ordersData.results.map((order, index) => (
                <div
                  key={index}
                  className="p-4 border-b space-y-3"
                  onClick={() => handleNavigate(order.reference)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{order.reference}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize${
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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span className="font-medium">${order.total_amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Items: {order.orders.length}
                    </span>
                    {/* <DeliveryStatusCell order={order} /> */}
                  </div>
                </div>
              ))}
            </div>

            {ordersData.results.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-xl">No orders found</p>
                <p className="mt-2">Try adjusting your search or filter</p>
              </div>
            )}

            {ordersData.count > 0 && (
              <div className="flex justify-between items-center p-4 border-t">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * 8 + 1} to{" "}
                  {Math.min(currentPage * 8, ordersData.count)} of{" "}
                  {ordersData.count} orders
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!ordersData.previous}
                    className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center space-x-1">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-8 h-8 rounded-md ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 border hover:bg-gray-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!ordersData.next}
                    className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to update the delivery status of order{" "}
              {currentReference} to {selectedStatus}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeliveryStatusUpdate}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
