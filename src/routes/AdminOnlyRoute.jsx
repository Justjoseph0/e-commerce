import AdminDashboard from "@/pages/AdminDashboard";
import AdminOrderDetails from "@/pages/AdminOrderDetails";
import AdminOrders from "@/pages/AdminOrders";
import AdminProfileLayout from "@/pages/AdminProfileLayout";
import CustomerListPage from "@/pages/CustomerListPage";
import ProductManagement from "@/pages/ProductManagement";
import { Route } from "react-router-dom";

const AdminOnlyRoute = () => {
  return (
    <>
      <Route path="/admin" element={<AdminProfileLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="order/:reference" element={<AdminOrderDetails />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="customers" element={<CustomerListPage />} />
      </Route>
    </>
  );
};

export default AdminOnlyRoute;
