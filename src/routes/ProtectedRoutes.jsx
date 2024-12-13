import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import UserRoutes from "./UserRoutes";

const ProtectedRoutes = () => (
  <Route element={<ProtectedRoute />}>
    {UserRoutes()}
  </Route>
);

export default ProtectedRoutes;
