import { ClothingList } from "@/components/ClothingList";
import HeroSection from "../components/HeroSection";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

const WomenPage = () => {
  const { products, isLoading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProductsHandler();
    // console.log(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProductsHandler = async () => {
    await fetchProducts(1, { category: "women" });
  };

  return (
    <section className="flex flex-col gap-y-10">
      <HeroSection
        title="Women Wears"
        subtitle="Discover the Women Wears at Batitude Originals."
      />
      <ClothingList
        products={products}
        isLoading={isLoading}
        category="women"
        message="Women Page."
      />
    </section>
  );
};

export default WomenPage;
