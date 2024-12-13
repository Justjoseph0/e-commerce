import { User, ShoppingCart, Heart, LogOut, Star, Book } from "lucide-react";
import SidebarLink from "./SidebarLink";
import Button from "./Button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <div>
      <nav className="space-y-4">
        <SidebarLink
          to="/profile"
          icon={<User className="mr-3" />}
          label="My Profile"
        />
        <SidebarLink
          to="/profile/orders"
          icon={<ShoppingCart className="mr-3" />}
          label="My Orders"
        />
        <SidebarLink
          to="/profile/wishlist"
          icon={<Heart className="mr-3" />}
          label="Wishlist"
        />
        <SidebarLink
          to="/profile/reviews"
          icon={<Star className="mr-3" />}
          label="My Reviews"
        />
        <SidebarLink
          to="/profile/address"
          icon={<Book className="mr-3" />}
          label="Address Book"
        />

        <hr className="my-4 border-gray-200" />

        <Button 
        onClick={handleLogout}
        className="w-full flex items-center justify-center text-red-600 hover:bg-red-50 p-2 rounded-md transition">
          <LogOut className="mr-3" />
          Logout
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
