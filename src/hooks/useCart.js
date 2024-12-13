import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
  };
