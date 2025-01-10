import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("cart  must be used within a Cart Provider");
    }
    return context;
  };
