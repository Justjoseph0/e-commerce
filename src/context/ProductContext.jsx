import { createContext, useState } from "react";
import api from "@/api";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({
    data: [],
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
  });
  const [currentProduct, setCurrentProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchProducts = async (page = 1, params = {}) => {
    setIsLoading(true);
    try {
      const response = await api.get("api/products/", {
        params: {
          page,
          ...params,
        },
      });
      const res = response.data;
      // console.log(res);

      setProducts({
        data: res.results,
        count: res.count,
        next: res.next,
        previous: res.previous,
        currentPage: page,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.originalError?.message) {
        setError(error.originalError.message);
      }
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
      const res = await api.get(`api/product/detail/${productSlug}/`);
      setCurrentProduct(res.data);
    } catch (error) {
      console.error("error fetching products", error);
      if (error.originalError?.message) {
        setError(error.originalError.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(products);
  const search = async (query) => {
    try {
      const res = await api.get("api/product/search", {
        params: { search: query },
      });
      return res;
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const addProduct = async (data) => {
    try {
      await api.post("api/products/", data);
      fetchProducts();
      toast.success("Product Created successfully!");
      console.log("sssss");
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.image) {
          toast.error(errorData.image);
          return;
        }
        if (errorData.is_available) {
          toast.error(errorData.is_available);
        }
      }
    }
  };

  const updateProduct = async (productSlug, data) => {
    if (data instanceof FormData) {
      console.log("FormData being sent to the backend:");
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }
    } else {
      console.log("Data being sent to the backend:", data);
    }
    try {
      await api.patch(`api/product/detail/${productSlug}/`, data);
      fetchProducts();
      toast.success("Product Created successfully!");
      // console.log("sssss");
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.image) {
          toast.error(errorData.image);
          return;
        }
        if (errorData.is_available) {
          toast.error(errorData.is_available);
        }
      }
    }
  };

  const deleteProduct = async (productSlug, data) => {
    try {
      await api.delete(`api/product/detail/${productSlug}/`, data);
      fetchProducts();
      toast.success("Product Deleted successfully!");
      console.log("sssss");
    } catch (error) {
      console.error(error);
    }
  };

  const addWishList = async (productId, sizes = "M") => {
    console.log("Adding to wishlist:", productId, sizes);

    try {
      const payload = { product_id: productId };
      if (sizes) {
        payload.size = sizes;
      }
      console.log("Payload:", payload);
      await api.post("api/wishlist/", payload);
    } catch (error) {
      console.error("Error adding product to wishlist", error.response.data);
    }
  };

  const fetchWishList = async () => {
    try {
      const res = await api.get("api/wishlist/");
      return res.data;
    } catch (error) {
      console.error("Error fetching wishlist", error);
    }
  };

  const deleteWishList = async (productId, size) => {
    console.log("Deleting from wishlist:", productId, size);
    try {
      const payload = {
        product_id: productId,
      };

      if (size) {
        payload.size = size;
      }
      await api.delete("api/wishlist/", {
        data: payload,
      });
      toast.success("Product removed from wishlist");
    } catch (error) {
      console.error("Error removing product from wishlist", error);
      toast.error("Error removing product from wishlist");
    }
  };

  const reviewProduct = async (
    product_id,
    reference,
    rating,
    name,
    review,
    title,
    size
  ) => {
    setIsLoading(true);

    const data = {
      rating,
      review,
      reference,
      size,
      title,
      name,
    };

    try {
      const res = await api.post(`api/product/${product_id}/reviews/`, data);
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async (product_id) => {
    console.log(product_id);

    try {
      const data = await api.get(`api/product/${product_id}/reviews/`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const pendingReview = async (page = 1) => {
    try {
      const response = api.get("api/order/pending_review/", {
        params: {
          page,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPendingReviewDetail = (productId, size, reference) => {
    setIsLoading(true);
    try {
      const response = api.get(`api/order/pending/${productId}/`, {
        params: {
          reference,
          size,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: products.data,
        productMeta: {
          count: products.count,
          next: products.next,
          previous: products.previous,
          currentPage: products.currentPage,
        },
        isLoading,
        fetchProductDetail,
        currentProduct,
        search,
        fetchCategories,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchProducts,
        addWishList,
        fetchWishList,
        deleteWishList,
        error,
        reviewProduct,
        // fetchReviews,
        pendingReview,
        fetchPendingReviewDetail,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
