import { ProductContext } from "@/context/ProductContext";
import { useContext } from "react";


export const useProducts = () => useContext(ProductContext);