import { lazy } from "react";
import AddressBook from "@/pages/AddressBook";
import Orders from "@/pages/Orders";
import Reviews from "@/pages/Reviews";
import UserProfileLayout from "@/pages/UserProfileLayout";
import Watchlist from "@/pages/Watchlist";
import { Route } from "react-router-dom";
import AddAddressForm from "@/pages/AddAddressForm";
import EditAddress from "@/pages/EditAddress";
import ReviewRatingDetail from "@/pages/ReviewRatingDetail";
import AdminOrderDetails from "@/pages/AdminOrderDetails";
const ProfilePage = lazy(() => import ( "@/pages/ProfilePage"))
const UserRoutes = () => {
  return (
    <>
      <Route path="/profile" element={<UserProfileLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order/:reference" element={<AdminOrderDetails />} />
        <Route path="wishlist" element={<Watchlist />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="reviews/rating/:productId" element={<ReviewRatingDetail />} />
        <Route path="address" element={<AddressBook />} />
        <Route path="add/address" element={<AddAddressForm />} />
        <Route path="edit/address/:addressId" element={<EditAddress />} />
      </Route>
    </>
  );
};

export default UserRoutes;
