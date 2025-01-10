import toast from "react-hot-toast";
import api from "@/api";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const response = await api.get("api/cart/");
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1, size) => {
    if (!isAuthenticated) {
      toast.error("You need to sign in to add items to cart.");
      return;
    }
    try {
      await api.post("api/cart/add/", {
        product_id: productId,
        quantity,
        size,
      });
      fetchCart();
      toast.success("Product added to cart!");
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response?.data?.error);
        return;
      }
      console.error("Error adding item to cart:", error);
      toast.error("Unable to add item to cart.");
    }
  };

  const updateCart = async (productId, quantity, size) => {
    const payload = {
      product_id: productId,
      quantity,
      size,
    };
    console.log("Sending to backend:", payload);
    if (!isAuthenticated) {
      toast.error("You need to sign in to update items in cart.");
      return;
    }

    try {
      await api.patch("api/cart/add/", payload);
      toast.success("Cart updated!");
      fetchCart();
    } catch (error) {
      console.error("Error updating item in cart:", error);
      if (error.response?.data?.detail) {
        const errorData = error.response.data.detail;
        toast.error(errorData);
      }
    }
  };

  const deleteItem = async (productId) => {
    try {
      await api.delete(`api/cart/item/${productId}/remove/`);
      toast.success("Item removed successfully!");
      fetchCart();
    } catch (error) {
      toast.error("Error deleting item:", error);
    }
  };

  const checkout = async (address_id) => {
    try {
      const response = await api.post("api/payment/", { address_id });

      const { authorization_url } = response.data.data;

      window.location.href = authorization_url;
    } catch (error) {
      console.error("Payment Initialization Error:", error);
      toast.error("Failed to process checkout");
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await api.get(`/api/orders/status/${reference}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const userOrders = async (page = 2) => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/user/orders/", { params: { page } });
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const adminOrders = async ({
    page = 1,
    statusFilter = "",
    searchTerm = "",
  }) => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/admin/orders/", {
        params: {
          page,
          status: statusFilter === "all" ? "" : statusFilter,
          search: searchTerm,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const adminOrderDetail = async (reference) => {
    try {
      const response = await api.get(`api/admin/order/${reference}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateDeliveryStatus = async (orderId, delivery_status) => {
    try {
      const res = await api.patch(`api/admin/update-delivery/${orderId}/`, {
        delivery_status,
      });
      console.log(res);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.error(error);
      if (error.originalError.response?.data) {
        const errorData = error.originalError.response?.data;
        toast.error(errorData.error);
      }
    }
  };

  const monthlyOrders = async () => {
    try {
      const response = await api.get("api/monthly-orders/");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCart,
        deleteItem,
        checkout,
        verifyPayment,
        userOrders,
        isLoading,
        adminOrders,
        adminOrderDetail,
        monthlyOrders,
        updateDeliveryStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};