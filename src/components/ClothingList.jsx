import ClothCard from "./ClothCard";
import SizeSelect from "./SizeSelect";
import SortSelect from "./SortSelect";
import Loading from "./Loading";
import { useState } from "react";
import PropTypes from "prop-types";
import { useProducts } from "@/hooks/useProducts";
import toast from "react-hot-toast";

export const ClothingList = ({ products, isLoading,category }) => {
  const [sortOption, setSortOption] = useState("");
  const { productMeta, fetchProducts } = useProducts();

  const handleSortChange = (selectedValue) => {
    setSortOption(selectedValue);
    
    
    
    const sortParams = { 
      category: category 
    };
  
    switch (selectedValue) {
      case "lowPrice":
        sortParams.sort = 'discounted_price';
        break;
      case "HighPrice":
        sortParams.sort = '-discounted_price';
        break;
      case "available":
        sortParams.is_available = true;
        break;
    }
  
    try {
      fetchProducts(1, sortParams);
    } catch (error) {
      console.error("Sorting error:", error);
      toast.error("Failed to apply sorting");
    }
  };

  const handlePageChange = (pageNumber) => {
    const pageParams = { 
      category: category,
      ...(sortOption === "lowPrice" && { sort: 'discounted_price' }),
      ...(sortOption === "HighPrice" && { sort: '-discounted_price' }),
      ...(sortOption === "available" && { is_available: true })
    };
  
    fetchProducts(pageNumber, pageParams);
  };

  if (isLoading) {
    return <Loading />;
  }

  const totalPages = Math.ceil(productMeta.count / 15);

  return (
    <section className="lg:px-10 px-4">
      <div className="mb-10 flex gap-4 justify-end">
        <SortSelect 
          handleSortChange={handleSortChange} 
          currentSort={sortOption}
        />
        <SizeSelect />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
        {products.map((cloth) => (
          <ClothCard key={cloth.id} cloth={cloth} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(productMeta.currentPage - 1)}
          disabled={!productMeta.previous}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              productMeta.currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            } rounded`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(productMeta.currentPage + 1)}
          disabled={!productMeta.next}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

ClothingList.propTypes = {
  products: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  category: PropTypes.string
};