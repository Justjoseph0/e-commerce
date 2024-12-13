import { User, ShoppingCart, Search, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";

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

    // Debounce search to reduce unnecessary API calls
    if (searchQuery.trim()) {
      timeoutId = setTimeout(performSearch, 300);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [searchQuery, search]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchModalOpen]);

  // Handle search result click
  const handleSearchResultClick = (slug) => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchModalOpen(false);
    navigate(`/product/detail/${slug}`);
  };

  // Open full search modal
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Close search modal
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
      <nav className="py-8 px-4 mb-8 sticky top-0 bg-white z-50 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-4 border-b">
            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Logo */}
            <div className="lg:text-3xl font-bold">Logo</div>

            {/* Cart and Search Icons */}
            <ul className="flex items-center lg:gap-x-5 gap-x-3 relative">
              {/* Search Icon */}
              <button
                className="flex justify-center items-center w-8 h-8"
                onClick={openSearchModal}
              >
                <Search />
              </button>

              {/* Cart Icon */}
              <Link to="/cart" className="relative block">
                <ShoppingCart />
                {cartItemCount > 0 && (
                  <span className="absolute top-[-8px] right-[-4px] bg-red-500 text-white text-xs rounded-full px-1">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Icon */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-x-2 text-custom-brown">
                  <User className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-custom-brown/20 rounded-lg shadow-xl">
                  <div className="px-4 py-2">
                    {isAuthenticated ? (
                      <DropdownMenuLabel
                        onClick={handleLogout}
                        className="font-bold bg-red-500 hover:bg-red-600 text-custom-beige py-3 px-4 text-center rounded-lg shadow-lg uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-95 cursor-pointer"
                      >
                        Logout
                      </DropdownMenuLabel>
                    ) : (
                      <Link to="/login">
                        <DropdownMenuLabel className="font-bold bg-custom-brown text-custom-beige py-3 px-4 text-center rounded-lg shadow-lg uppercase tracking-wider transition duration-300 ease-in-out transform hover:scale-95">
                          Login
                        </DropdownMenuLabel>
                      </Link>
                    )}
                  </div>
                  <DropdownMenuSeparator className="bg-custom-brown/20" />
                  <Link to="/profile">
                    <DropdownMenuItem className="px-4 py-2 hover:bg-custom-brown/10 cursor-pointer transition-colors duration-200 ease-in-out hover:font-semibold">
                      <span className="text-custom-brown">My Account</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/profile/orders">
                    <DropdownMenuItem className="px-4 py-2 hover:bg-custom-brown/10 cursor-pointer transition-colors duration-200 ease-in-out hover:font-semibold">
                      <span className="text-custom-brown">Order</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </ul>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex justify-center gap-x-8 mt-4 text-custom-brown">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `p-3 text-base ${
                    isActive
                      ? "text-custom-beige bg-custom-brown rounded-lg"
                      : "text-custom-brown font-medium"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/women"
                className={({ isActive }) =>
                  `p-3 text-base ${
                    isActive
                      ? "text-custom-beige bg-custom-brown rounded-lg"
                      : "text-custom-brown font-medium"
                  }`
                }
              >
                Women
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/men"
                className={({ isActive }) =>
                  `p-3 text-base ${
                    isActive
                      ? "text-custom-beige bg-custom-brown rounded-lg"
                      : "text-custom-brown font-medium"
                  }`
                }
              >
                Men
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new-arrival"
                className={({ isActive }) =>
                  `p-3 text-base ${
                    isActive
                      ? "text-custom-beige bg-custom-brown rounded-lg"
                      : "text-custom-brown font-medium"
                  }`
                }
              >
                New Arrival
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collections"
                className={({ isActive }) =>
                  `p-3 text-base ${
                    isActive
                      ? "text-custom-beige bg-custom-brown rounded-lg"
                      : "text-custom-brown font-medium"
                  }`
                }
              >
                Collections
              </NavLink>
            </li>
          </ul>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-[#FBF9F3] absolute top-0 left-0 w-full h-screen z-50 py-6 px-4">
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">Logo</div>
                <button
                  className="text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X />
                </button>
              </div>
              <ul className="flex flex-col items-center gap-y-5 mt-5">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-lg ${
                        isActive
                          ? "text-custom-beige bg-custom-brown p-2 rounded-lg"
                          : "text-custom-brown font-medium"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/women"
                    className={({ isActive }) =>
                      `text-lg ${
                        isActive
                          ? "text-custom-beige bg-custom-brown p-2 rounded-lg"
                          : "text-custom-brown font-medium"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Women
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/men"
                    className={({ isActive }) =>
                      `text-lg ${
                        isActive
                          ? "text-custom-beige bg-custom-brown p-2 rounded-lg"
                          : "text-custom-brown font-medium"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Men
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/new-arrival"
                    className={({ isActive }) =>
                      `text-lg ${
                        isActive
                          ? "text-custom-beige bg-custom-brown p-2 rounded-lg"
                          : "text-custom-brown font-medium"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    New Arrival
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/collections"
                    className={({ isActive }) =>
                      `text-lg ${
                        isActive
                          ? "text-custom-beige bg-custom-brown p-2 rounded-lg"
                          : "text-custom-brown font-medium"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Collections
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Full Search Modal */}
      <div
        className={`fixed top-0 right-0 w-full md:h-[500px] h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSearchModalOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Panel Header */}
          <div className="flex justify-between items-center mb-4 p-4">
            <h2 className="text-2xl hidden sm:block font-bold text-custom-brown">
              Logo
            </h2>
            <div className="flex-grow mx-4">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-custom-brown"
              />
            </div>
            <button
              onClick={closeSearchModal}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Results Grid */}
          <div className="flex-grow overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-4">
                <span className="text-custom-brown">Searching...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {searchResults.slice(0, 5).map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearchResultClick(result.slug)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className="relative pt-[100%]">
                      <img
                        src={result.image}
                        alt={result.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-custom-brown truncate">
                        {result.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {result.category}
                      </p>
                      <p className="text-sm font-semibold text-custom-brown mt-1">
                        ${result.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              searchQuery.trim() !== "" && (
                <div className="text-center py-4 text-gray-500">
                  No results found
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Overlay for search panel */}
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSearchModal}
        />
      )}
    </>
  );
};

export default Navbar;
