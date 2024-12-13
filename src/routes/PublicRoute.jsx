import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WomenPage from "../pages/WomenPage";
import MenPage from "../pages/MenPage";
import NewArrival from "../pages/NewArrival";
import CollectionsPage from "../pages/CollectionsPage";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";

const PublicRoute = () => (
  <>
    <Route path="/" element={<HomePage />} />
    <Route path="/product/detail/:slug" element={<ProductDetails />} />
    <Route path="/women" element={<WomenPage />} />
    <Route path="/men" element={<MenPage />} />
    <Route path="/new-arrival" element={<NewArrival />} />
    <Route path="/collections" element={<CollectionsPage />} />
    <Route path="/cart" element={<Cart />} />
  </>
);

export default PublicRoute;
