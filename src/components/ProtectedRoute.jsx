import { Navigate, Outlet,useLocation } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "@/hooks/useAuth";


function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    
    

    if (loading) {
        return <Loading />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
}

export default ProtectedRoute;