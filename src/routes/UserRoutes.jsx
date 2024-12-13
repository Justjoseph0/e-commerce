import AddressBook from "@/pages/AddressBook";
import Orders from "@/pages/Orders";
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
      </Route>
    </>
  );
};

export default UserRoutes;
