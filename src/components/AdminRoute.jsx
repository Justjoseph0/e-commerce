import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "@/hooks/useAuth";

function AdminRoute() {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

   
    return isAuthenticated && user?.is_admin ? (
        <Outlet />
    ) : (

        <Navigate to="/unauthorized" replace />
    );
}

export default AdminRoute; 