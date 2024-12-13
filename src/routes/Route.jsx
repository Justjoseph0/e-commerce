import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import PublicRoute from "./PublicRoute";
import AuthRoutes from "./AuthRoutes";
import NotFoundRoute from "./NotFoundRoute";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import { Toaster } from "react-hot-toast";

const AppRoute = () => (
  <>
  <Toaster />
  <Routes>
    <Route path="/" element={<AppLayout />}>
      {PublicRoute()}
      {ProtectedRoutes()}
    </Route>
    {AuthRoutes()}
    {NotFoundRoute()}
    {ProtectedAdminRoute()}
    <Route path="unauthorized" element={<UnauthorizedPage />} />
  </Routes>
  </>
);

export default AppRoute;
