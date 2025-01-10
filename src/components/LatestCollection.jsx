import { useProducts } from "@/hooks/useProducts";
import ClothCard from "./ClothCard";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

const LatestCollection = () => {
  const { products, isLoading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProductsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProductsHandler = async () => {
    await fetchProducts(1, { sort: "-created_at" });
  };
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="latest collection."
        errorMessageText={error}
        onRetry={fetchProductsHandler}
      />
    );
  }

  return (
    <section className="max-w-7xl mx-auto lg:px-10 px-4 md:py-28 py-16 flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <h3 className="lg:text-2xl text-lg font-medium">Latest Collection</h3>
        <Link
          to="/collections"
          className="md:px-6 px-2 py-2 md:text-base text-sm border-gray-900 border rounded-lg hover:text-white hover:bg-gray-900 transition-all duration-300"
        >
          View All
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {products.map((cloth) => (
            <ClothCard key={cloth.id} cloth={cloth} />
          ))}
        </div>
      ) : (
        <ErrorMessage
          message="latest collection."
          errorMessageText={error}
          onRetry={fetchProductsHandler}
        />
      )}
    </section>
  );
};

export default LatestCollection;
