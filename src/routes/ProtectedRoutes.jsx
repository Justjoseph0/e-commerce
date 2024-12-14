import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import UserRoutes from "./UserRoutes";
import VerifyPayment from "@/pages/VerifyPayment";
import CheckoutPage from "@/pages/CheckoutPage";

const ProtectedRoutes = () => (
 
  <Route element={<ProtectedRoute />}>
    {UserRoutes()}
    <Route path="verify-payment" element={<VerifyPayment />} />
    <Route path="checkout" element={<CheckoutPage />} />
  </Route>
);

export default ProtectedRoutes;
