import ClothCard from "./ClothCard";
import SizeSelect from "./SizeSelect";
import SortSelect from "./SortSelect";
import Loading from "./Loading";
import { useState } from "react";
import PropTypes from "prop-types";
import { useProducts } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

export const ClothingList = ({
  products,
  isLoading,
  category,
  message,
}) => {
  const [sortOption, setSortOption] = useState("");
  const { productMeta, fetchProducts, error } = useProducts();
  const [selectedSize, setSelectedSize] = useState("");

  // console.log(selectedSize);

  const handleSortChange = (selectedValue) => {
    setSortOption(selectedValue);

    const sortParams = {
      category: category,
      ...(selectedSize && { size: selectedSize }),
    };

    switch (selectedValue) {
      case "lowPrice":
        sortParams.sort = "discounted_price";
        break;
      case "HighPrice":
        sortParams.sort = "-discounted_price";
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
      ...(selectedSize && { size: selectedSize }),
      ...(sortOption === "lowPrice" && { sort: "discounted_price" }),
      ...(sortOption === "HighPrice" && { sort: "-discounted_price" }),
      ...(sortOption === "available" && { is_available: true }),
    };

    fetchProducts(pageNumber, pageParams);
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);

    const sizeParams = {
      category: category,
      ...(value && { size: value }),
      ...(sortOption === "lowPrice" && { sort: "discounted_price" }),
      ...(sortOption === "HighPrice" && { sort: "-discounted_price" }),
      ...(sortOption === "available" && { is_available: true }),
    };

    fetchProducts(1, sizeParams);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={message}
        errorMessageText={error}
      />
    );
  }

  const totalPages = Math.ceil(productMeta.count / 15);

  return (
    <section className="max-w-7xl mx-auto lg:px-10 px-4">
      <div className="mb-10 flex gap-4 justify-end">
        <SortSelect
          handleSortChange={handleSortChange}
          currentSort={sortOption}
        />
        <SizeSelect
          onSizeChange={handleSizeChange}
          selectedSize={selectedSize}
        />
      </div>

      {products.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {products.map((cloth) => (
            <ClothCard key={cloth.id} cloth={cloth} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-500">
            No products found.
          </h2>
          <p className="text-gray-400 mt-2">
            Try adjusting your filters or check back later!
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <Button
          onClick={() => handlePageChange(productMeta.currentPage - 1)}
          disabled={!productMeta.previous}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </Button>

        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              productMeta.currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          onClick={() => handlePageChange(productMeta.currentPage + 1)}
          disabled={!productMeta.next}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </section>
  );
};

ClothingList.propTypes = {
  products: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  category: PropTypes.string,
  message: PropTypes.string.isRequired,
};
