
import { useProducts } from "@/hooks/useProducts";
import ClothCard from "./ClothCard";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useEffect } from "react";



const LatestCollection = () => {
  const { products, isLoading,fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts(1, { sort: "-created_at" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="max-w-7xl mx-auto lg:px-10 px-4 md:py-28 py-16 flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <h3 className="lg:text-2xl text-lg font-medium">Latest Collection</h3>
        <Link to="/collections" className="md:px-6 px-2 py-2 md:text-base text-sm border-custom-brown border rounded hover:text-custom-beige hover:bg-custom-brown transition duration-300 ease-in-out transform hover:scale-95">
          View All
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {products.map((cloth) => (
          <ClothCard key={cloth.id} cloth={cloth} />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
