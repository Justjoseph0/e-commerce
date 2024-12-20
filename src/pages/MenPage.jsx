import { useProducts } from "@/hooks/useProducts";
import { ClothingList } from "../components/ClothingList";
import HeroSection from "../components/HeroSection";
import { useEffect } from "react";

const MenPage = () => {
  const { products, isLoading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts(1, { category: "men" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(products);

  return (
    <section className="max-w-7xl mx-auto flex flex-col gap-y-10">
      <HeroSection
        backgroundImage="men.jpg"
        title="Men Wears"
        subtitle="Discover Men Wears at Batitude Originals."
      />
      <ClothingList products={products} isLoading={isLoading} category="men" />
    </section>
  );
};

export default MenPage;
