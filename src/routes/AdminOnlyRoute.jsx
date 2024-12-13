import AdminDashboard from "@/pages/AdminDashboard";
import AdminOrders from "@/pages/AdminOrders";
import AdminProfileLayout from "@/pages/AdminProfileLayout";
import ProductManagement from "@/pages/ProductManagement";
import { Route } from "react-router-dom";

const AdminOnlyRoute = () => {
  return (
    <>
      <Route path="/admin" element={<AdminProfileLayout />}>
        <Route index element={<AdminDashboard />}></Route>
        <Route path="orders" element={<AdminOrders />}></Route>
        <Route path="products" element={<ProductManagement />}></Route>
      </Route>
    </>
  );
};

export default AdminOnlyRoute;
