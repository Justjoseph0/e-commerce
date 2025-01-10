import Loading from "@/components/Loading";
import { useCart } from "@/hooks/useCart";
import { ChevronLeft, Package, CheckCircle, Clock, XCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminOrderDetails = () => {
  const { reference } = useParams();
  const { adminOrderDetail } = useCart();
  const [currentOrder, setCurrentOrder] = useState([]);
  const [currentAdd, setCurrentAdd] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  async function getOderDetail() {
    setIsLoading(true)
    try{
      const data = await adminOrderDetail(reference);
      setCurrentOrder(data);
      setCurrentAdd(data.address)
    }catch(error){
      console.error(error);
    }finally{
      setIsLoading(false)
    }
  }
    // console.log(currentOrder);
    
  console.log(currentAdd);

  useEffect(() => {
    getOderDetail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Status icon and color mapping
  const statusInfo = {
    success: {
      icon: <CheckCircle className="text-green-600" />,
      color: "text-green-600",
    },
    failed: {
      icon: <XCircle className="text-red-600" />,
      color: "text-red-600",
    },
    pending: {
      icon: <Clock className="text-yellow-600" />,
      color: "text-yellow-600",
    },
    cancelled: {
      icon: <Package className="text-gray-600" />,
      color: "text-gray-600",
    },
    abandoned: {
        icon: <Trash2 className="text-orange-600" />,
        color: "text-orange-600",
      },
  };
  

  function handleBack() {
    navigate("/admin/orders");
  }

  if(isLoading) return <Loading />

  return (
    <div className="bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="p-6 border-b flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        </div>
        <div
          className={`flex items-center space-x-2 ${statusInfo[currentOrder?.status]?.color}`}
        >
          {statusInfo[currentOrder.status]?.icon}
          <span className="font-medium">{currentOrder.status}</span>
        </div>
      </div>

      {/* Order Summary Grid */}
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* Order Information */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b pb-2">
            Order Information
          </h2>
          <div>
            <p className="text-gray-600">Order Number</p>
            <p className="font-medium">{currentOrder.reference}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Date</p>
            <p className="font-medium">
              {new Date(currentOrder.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b pb-2">Customer</h2>
          <div>
            <p className="font-medium">{currentOrder.username}</p>
            <p className="text-gray-600">{currentOrder.email}</p>
            <p className="text-gray-600">{currentAdd?.phone_number || ""}</p>
          </div>
          <div>
            <p className="text-gray-600">Shipping Address</p>
            <p className="font-medium">{currentAdd?.street_address},</p>
            <p className="font-medium">{currentAdd?.city}, {currentAdd?.state} state,</p>
            <p className="font-medium"></p>
            <p className="font-medium">{currentAdd?.country}</p>
          </div>
        </div>

        {/* Payment & Shipping */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b pb-2">
            Payment & Shipping
          </h2>
          <div>
            <p className="text-gray-600">Payment Method</p>
            <p className="font-medium">
              {"currentOrder.payment.type} ••••{currentOrder.payment.last4"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Shipping Method</p>
            <p className="font-medium">{"currentOrder.shipping.method"}</p>
            <p className="text-gray-600">
              Tracking Number: {"currentOrder.shipping.tracking"}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 border-t">
        <h2 className="font-semibold text-lg mb-4">Order Items</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {currentOrder?.orders?.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">
                  <div className="font-medium">{item.product_name}</div>
                </td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-right">${item.price}</td>
                <td className="p-3 text-right font-medium">
                  ${item.total_price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="p-3 text-right text-gray-600">
                Subtotal
              </td>
              <td className="p-3 text-right font-medium">
                $
                {currentOrder?.orders
                  ?.reduce((sum, item) => sum + item.total_price, 0)
                  .toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="p-3 text-right text-gray-600">
                Shipping
              </td>
              <td className="p-3 text-right font-medium">${"not given yet"}</td>
            </tr>
            <tr className="font-bold">
              <td colSpan="3" className="p-3 text-right text-lg">
                Total
              </td>
              <td className="p-3 text-right text-lg text-green-600">
                ${currentOrder.total_amount}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
