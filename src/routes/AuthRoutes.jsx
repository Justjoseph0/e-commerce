import ActivateAccount from "@/pages/ActivateAccount";
import CheckMailPage from "@/pages/CheckMailPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Route } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/check-mail" element={<CheckMailPage />} />
      <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
    </>
  );
};

export default AuthRoutes;
