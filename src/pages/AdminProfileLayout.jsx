import { useState } from "react";
import SidebarLink from "@/components/SidebarLink";
import {
  BarChart3,
  LayoutGrid,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Menu,
  X,
  Bell,
  Search,
  UserCircle,
  LogOut,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";

const AdminProfileLayout = () => {
  const { logout, user } = useAuth();

  const { username } = user;

  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // New function to close sidebar
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  function handleLogout() {
    logout();
    navigate("/login");
    closeMobileSidebar(); 
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 
        transform transition-transform duration-300 h-fit
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}
      >
        <div className="p-5 border-b ">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <SidebarLink
              to="/admin"
              icon={<LayoutGrid className="mr-3" />}
              label="Dashboard"
              onClick={closeMobileSidebar}
            />
            <SidebarLink
              to="/admin/orders"
              icon={<ShoppingCart className="mr-3" />}
              label="Orders"
              onClick={closeMobileSidebar}
            />
            <SidebarLink
              to="/admin/products"
              icon={<Package className="mr-3" />}
              label="Products"
              onClick={closeMobileSidebar}
            />
            <SidebarLink
              to="/admin/customers"
              icon={<Users className="mr-3" />}
              label="Customers"
              onClick={closeMobileSidebar}
            />
            <SidebarLink
              to="/admin/analytics"
              icon={<BarChart3 className="mr-3" />}
              label="Analytics"
              onClick={closeMobileSidebar}
            />
            <SidebarLink
              to="/admin/settings"
              icon={<Settings className="mr-3" />}
              label="Settings"
              onClick={closeMobileSidebar}
            />
          </ul>

          <hr className="my-4 border-gray-200" />

          <Button
            onClick={handleLogout}
            className="w-full flex items-center justify-center text-red-600 hover:bg-red-50 p-2 rounded-md transition"
          >
            <LogOut className="mr-3" />
            Logout
          </Button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Mobile Sidebar Toggle for Small Devices */}
            <div className="lg:hidden mr-4">
              <button 
                onClick={toggleMobileSidebar}
                className="text-gray-600 hover:text-gray-800"
              >
                {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 md:max-w-xs relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
            </div>

            {/* User and Notification Area */}
            <div className="flex items-center space-x-4 ml-4">
              {/* Notification Icon */}
              <div className="relative">
                <button className="text-gray-600 hover:text-gray-800 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    3
                  </span>
                </button>
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <UserCircle size={32} className="text-gray-400" />
                  <span className="hidden md:block text-sm font-medium">
                    Hello {username}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto lg:p-6 bg-gray-50 px-4">
          <div className="max-w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProfileLayout;