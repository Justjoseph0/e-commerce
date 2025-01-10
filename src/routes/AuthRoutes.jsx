import ActivateAccount from "@/pages/ActivateAccount";
import CheckMailPage from "@/pages/CheckMailPage";
import Login from "@/pages/Login";
import PasswordChangedPage from "@/pages/PasswordChangedPage";
import Register from "@/pages/Register";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SendPasswordResetPage from "@/pages/SendPasswordResetPage";
import { Route } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/check-mail/activate" element={<CheckMailPage type="activate" />} />
       <Route path="/check-mail/reset" element={<CheckMailPage  />} />
      <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
      <Route path="/forgot-password" element={<SendPasswordResetPage />} />
      <Route path="/reset-password-confirm/:uidb64/:token" element={<ResetPasswordPage />}/>
      <Route path="/password-changed" element={<PasswordChangedPage />} />
    </>
  );
};

export default AuthRoutes;
