import { ClothingList } from "@/components/ClothingList"
import HeroSection from "@/components/HeroSection"
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";


const CollectionsPage = () => {
  const { products, isLoading,fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts(1, { sort: "created_at" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="max-w-7xl mx-auto flex flex-col gap-y-10">
      <HeroSection
        backgroundImage="bg-image.png"
        title="Collections"
        subtitle='Explore our curated collections, thoughtfully designed to bring you the latest trends and timeless classics.'
      />
      <ClothingList products={products} isLoading={isLoading} />
    </section>
  )
}

export default CollectionsPage