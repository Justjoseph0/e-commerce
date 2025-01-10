import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import PublicRoute from "./PublicRoute";
import AuthRoutes from "./AuthRoutes";
import NotFoundRoute from "./NotFoundRoute";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import { Toaster } from "react-hot-toast";

const toasterConfig = {
  position: "top-right",
  reverseOrder: false,
  gutter: 8,
  containerStyle: {
    top: 40,
  },
  toastOptions: {
    className: "",
    duration: 4000,
    style: {
      background: "#1e293b",
      color: "#ffffff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#ffffff",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
    }
  },
};

const AppRoute = () => (
  <>
    <Toaster {...toasterConfig} />
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
