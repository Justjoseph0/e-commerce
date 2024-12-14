import toast from "react-hot-toast";
import api from "@/api";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";


// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isAuthenticated } = useAuth();

  const localCartKey = "cart";

  const saveLocalCart = (cart) => {
    localStorage.setItem(localCartKey, JSON.stringify(cart));
    setCart(cart);
  };

  const loadLocalCart = () => {
    const storedCart = JSON.parse(localStorage.getItem(localCartKey) || "[]");
    setCart(storedCart);
  };

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await api.get("api/cart/");
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId, quantity = 1, size, product) => {
    if (!isAuthenticated) {
      const storedCart = JSON.parse(localStorage.getItem(localCartKey) || "[]");
      const existingItem = storedCart.find(
        (item) => item.product_id === productId && item.size === size
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        storedCart.push({
          id: Math.random(),
          product_id: product.id,
          product_name: product.name,
          product_image: product.image,
          price: product.price,
          discounted_price: product.discounted_price,
          quantity,
          size,
          slug: product.slug,
          get_total_price: quantity * product.discounted_price,
        });
      }
      localStorage.setItem(localCartKey, JSON.stringify(storedCart));
      setCart(storedCart);
      toast.success("Item added to cart!");
      return;
    }
    try {
      await api.post("api/cart/add/", {
        product_id: productId,
        quantity,
        size,
      });
      fetchCart();
      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Unable to add item to cart.");
    }
  };

  const updateCart = async (productId, quantity,size) => {

    console.log('Updating cart:', {
      productId, 
      quantity, 
      isAuthenticated,
      currentCart: cart,
      size
    });
  
    if (isAuthenticated) {
      try {
        await api.patch("api/cart/add/", { product_id: productId, quantity,size });
        toast.success("Cart updated!");
        fetchCart();
      } catch (error) {
        console.error("Error updating item in cart:", error);
        if(error.response?.data?.detail){
          const errorData = error.response.data.detail
          toast.error(errorData)
        }
      }
    } else {
      const updatedCart = cart.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      );
      saveLocalCart(updatedCart);
      toast.success("Cart updated!");
    }
  };

  const deleteItem = async (productId) => {
    console.log(productId);
    
    if (isAuthenticated) {
      try {
        await api.delete(`api/cart/item/${productId}/remove/`);
        toast.success("Item removed successfully!");
        fetchCart();
      } catch (error) {
        toast.error("Error deleting item:", error);
      }
    } else {
      const updatedCart = cart.filter((item) => item.id !== productId);
      saveLocalCart(updatedCart); 
      toast.success("Item removed successfully!");
    }
  };

  const syncCart = async () => {
  
    const localCart = JSON.parse(localStorage.getItem(localCartKey) || "[]");
  
    if (localCart.length === 0) {
      console.error("No items in the local cart to sync.");
      return;
    }
  
    try {
      await api.post("api/cart/sync/", { cart: localCart });
      console.log("Cart synced successfully!");
      localStorage.removeItem(localCartKey)
      fetchCart();
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };
  


  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      syncCart();
    } else {
      loadLocalCart();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};
