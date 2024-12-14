import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import UserRoutes from "./UserRoutes";
import VerifyPayment from "@/pages/VerifyPayment";

const ProtectedRoutes = () => (
  <Route element={<ProtectedRoute />}>
    {UserRoutes()}
    <Route path="verify-payment" element={<VerifyPayment />} />
  </Route>
);

export default ProtectedRoutes;
