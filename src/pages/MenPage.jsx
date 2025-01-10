import { useProducts } from "@/hooks/useProducts";
import { ClothingList } from "../components/ClothingList";
import HeroSection from "../components/HeroSection";
import { useEffect } from "react";

const MenPage = () => {
  const { products, isLoading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProductsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProductsHandler = async () => {
    await fetchProducts(1, { category: "men" });
  };

  return (
    <section className="max-w-7xl mx-auto flex flex-col gap-y-10">
      <HeroSection
        backgroundImage="men.jpg"
        title="Men Wears"
        subtitle="Discover Men Wears at Batitude Originals."
      />
      <ClothingList
        products={products}
        isLoading={isLoading}
        category="men"
        message="Men Page."
        fetchProductsHandler={fetchProductsHandler}
      />
    </section>
  );
};

export default MenPage;
