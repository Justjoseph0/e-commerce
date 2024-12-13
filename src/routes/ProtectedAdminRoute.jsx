import AdminRoute from "@/components/AdminRoute"
import { Route } from "react-router-dom"
import AdminOnlyRoute from "./AdminOnlyRoute"


const ProtectedAdminRoute = () => {
  return (
    <Route element={<AdminRoute />}>
    {AdminOnlyRoute()}
  </Route>
  )
}

export default ProtectedAdminRoute