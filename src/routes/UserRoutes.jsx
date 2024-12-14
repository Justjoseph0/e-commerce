import AddressBook from "@/pages/AddressBook";
import Orders from "@/pages/Orders";
import PaymentFailed from "@/pages/PaymentFailed";
import PaymentSuccesful from "@/pages/PaymentSuccesful";
import ProfilePage from "@/pages/ProfilePage";
import Reviews from "@/pages/Reviews";
import UserProfileLayout from "@/pages/UserProfileLayout";
import Watchlist from "@/pages/Watchlist";
import { Route } from "react-router-dom";

const UserRoutes = () => {
  return (
    <>
      <Route path="/profile" element={<UserProfileLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Watchlist />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="address" element={<AddressBook />} />
        <Route path="failed" element={<PaymentFailed />} />
        <Route path="successful" element={<PaymentSuccesful />} />
      </Route>
    </>
  );
};

export default UserRoutes;
