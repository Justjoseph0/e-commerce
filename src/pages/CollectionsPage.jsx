import { ClothingList } from "@/components/ClothingList";
import HeroSection from "@/components/HeroSection";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

const CollectionsPage = () => {
  const { products, isLoading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProductsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProductsHandler = async () => {
    await fetchProducts(1, { sort: "-created_at" });
  };
  return (
    <section className="flex flex-col gap-y-10">
      <HeroSection
        title="Collections"
        subtitle="Explore our curated collections, thoughtfully designed to bring you the latest trends and timeless classics."
      />
      <ClothingList
        products={products}
        isLoading={isLoading}
        message="latest collection."
      />
    </section>
  );
};

export default CollectionsPage;
