import { ClothingList } from "@/components/ClothingList";
import HeroSection from "../components/HeroSection";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

const NewArrival = () => {
  const { products, isLoading, fetchProducts } = useProducts();
  useEffect(() => {
    fetchProductsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProductsHandler = async () => {
    await fetchProducts(1, { sort: "-created_at" });
  };
  return (
    <section className="max-w-7xl mx-auto flex flex-col gap-y-10">
      <HeroSection
        backgroundImage="newarrival.jpg"
        title="New Arrival"
        subtitle="Discover the New Arrivals Batitude Originals at Batitude Originals"
      />
      <ClothingList
        products={products}
        isLoading={isLoading}
        fetchProductsHandler={fetchProductsHandler}
        message="New Arrival."
      />
    </section>
  );
};

export default NewArrival;
