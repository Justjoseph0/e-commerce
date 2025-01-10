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
    <section className="flex flex-col gap-y-10">
      <HeroSection
        title="Men Wears"
        subtitle="Discover Men Wears at Batitude Originals."
      />
      <ClothingList
        products={products}
        isLoading={isLoading}
        category="men"
        message="Men Page."
      />
    </section>
  );
};

export default MenPage;
