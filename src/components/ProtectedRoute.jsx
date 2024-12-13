import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "@/hooks/useAuth";


function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    
    

    if (loading) {
        return <Loading />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;