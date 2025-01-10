import { User, ShoppingCart, Search, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import Button from "./Button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { search } = useProducts();
  const { cart } = useCart();

  // Handle search with debounce
  useEffect(() => {
    let timeoutId;
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await search(searchQuery);
        setSearchResults(response.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.trim()) {
      timeoutId = setTimeout(performSearch, 300);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [searchQuery, search]);

  useEffect(() => {
    if (isSearchModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchModalOpen]);

  const handleSearchResultClick = (slug) => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchModalOpen(false);
    navigate(`/product/detail/${slug}`);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
    setSearchQuery("");
    setSearchResults([]);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const cartItemCount = cart.length;

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar */}
          <div className="h-16 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <Button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </Button>

            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              LOGO
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <Button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={openSearchModal}
              >
                <Search className="w-5 h-5 text-gray-700" />
              </Button>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <User className="w-5 h-5 text-gray-700" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-2 p-2 bg-white rounded-lg shadow-lg border border-gray-100">
                  {isAuthenticated ? (
                    <>
                      <DropdownMenuItem className="p-2 hover:bg-gray-50 rounded-md">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2"
                        >
                          <span className="text-gray-700">My Account</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-2 hover:bg-gray-50 rounded-md">
                        <Link
                          to="/profile/orders"
                          className="flex items-center space-x-2"
                        >
                          <span className="text-gray-700">Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-2 hover:bg-gray-50 rounded-md">
                        <Link
                          to="/profile/wishlist"
                          className="flex items-center space-x-2"
                        >
                          <span className="text-gray-700">Wishlist</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-2 border-gray-100" />
                      <DropdownMenuItem
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem className="p-0">
                      <Link
                        to="/login"
                        className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-center"
                      >
                        Login
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block border-t border-gray-100">
            <ul className="flex justify-center space-x-8 h-12">
              {["Home", "Women", "Men", "New Arrival", "Collections"].map(
                (item) => (
                  <li key={item}>
                    <NavLink
                      to={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(" ", "-")}`
                      }
                      className={({ isActive }) =>
                        `h-full flex items-center px-4 text-sm font-medium transition-colors ${
                          isActive
                            ? "text-gray-900 border-b-2 border-gray-900"
                            : "text-gray-600 hover:text-gray-900"
                        }`
                      }
                    >
                      {item}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-50 pt-16">
            <Button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 transition-all"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6 text-gray-700" />
            </Button>
            <div className="p-4">
              <ul className="space-y-4">
                {["Home", "Women", "Men", "New Arrival", "Collections"].map(
                  (item) => (
                    <li key={item}>
                      <NavLink
                        to={
                          item === "Home"
                            ? "/"
                            : `/${item.toLowerCase().replace(" ", "-")}`
                        }
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
          isSearchModalOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-white h-full md:h-[500px] shadow-xl">
          <div className="max-w-7xl mx-auto p-4">
            {/* Search Header */}
            <div className="flex items-center space-x-4 mb-6">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
              <Button
                onClick={closeSearchModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </Button>
            </div>

            {/* Search Results */}
            <div className="overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleSearchResultClick(result.slug)}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="mt-2">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {result.name}
                        </h3>
                        <p className="text-sm text-gray-500">${result.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                searchQuery.trim() !== "" && (
                  <div className="text-center py-8 text-gray-500">
                    No results found
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 -z-10"
          onClick={closeSearchModal}
        />
      </div>

      {/* Additional spacing to prevent content from hiding under fixed navbar */}
      <div className="h-24 lg:h-[7rem]" />
    </>
  );
};

export default Navbar;
