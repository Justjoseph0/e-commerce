import { createContext, useState, useEffect } from "react";
import api from "@/api";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({
    data: [],
    count: 0,
    next: null,
    previous: null,
    currentPage: 1
  });
  const [currentProduct, setCurrentProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (page = 1, params = {}) => {
    setIsLoading(true);
    try {
      const response = await api.get("api/products/",{
        params: {
          page,
          ...params
        }
  
      });
      const res = response.data
      console.log(res);
      
      setProducts({
        data: res.results,
        count: res.count,
        next: res.next,
        previous: res.previous,
        currentPage: page
      });

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("api/categories/");
      return res.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductDetail = async (productSlug = null) => {
    setIsLoading(true);
    try {
      const res = await api.get(`api/product/detail/${productSlug}`);
      setCurrentProduct(res.data);
    } catch (error) {
      console.error("error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(products);
  const search = async (query) => {
    try {
      const res = await api.get("api/product/search", {  params: { search: query } });
      return res;
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const addProduct = async (data) => {
    try {
      await api.post("api/products/",data);
      fetchProducts()
      toast.success("Product Created successfully!");
      console.log("sssss");
    } catch (error) {
      console.error(error);
      if(error.response?.data){
        const errorData = error.response.data;
        if (errorData.image) {
          toast.error(errorData.image)
          return;
        }
       if(errorData.is_available){
        toast.error(errorData.is_available)
       }
      }
    }
  };

  const updateProduct = async (productSlug,data) => {
    try {
      await api.patch(`api/product/detail/${productSlug}/`,data);
      fetchProducts()
      // toast.success("Product Created successfully!");
      console.log("sssss");
    } catch (error) {
      console.error(error);
      if(error.response?.data){
        const errorData = error.response.data;
        if (errorData.image) {
          toast.error(errorData.image)
          return;
        }
       if(errorData.is_available){
        toast.error(errorData.is_available)
       }
      }
    }
  };


  const deleteProduct = async (productSlug,data) => {
    try {
      await api.delete(`api/product/detail/${productSlug}/`,data);
      fetchProducts()
      toast.success("Product Deleted successfully!");
      console.log("sssss");
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);


  // console.log(products);
  

  return (
    <ProductContext.Provider
      value={{
        products: products.data,
        productMeta: {
          count: products.count,
          next: products.next,
          previous: products.previous,
          currentPage: products.currentPage
        },
        isLoading,
        fetchProductDetail,
        currentProduct,
        search,
        fetchCategories,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );



};
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired
};