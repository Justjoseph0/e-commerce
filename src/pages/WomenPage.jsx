import { ClothingList } from "@/components/ClothingList";
import HeroSection from "../components/HeroSection";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

const WomenPage = () => {
  const { products, isLoading,fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts(1, { category: "women" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(products);
  


  // console.log(products);
  
 
  return (
    <section className="max-w-7xl mx-auto flex flex-col gap-y-10">
      <HeroSection
        backgroundImage="women.jpg"
        title="Women Wears"
        subtitle="Discover the Women Wears at Batitude Originals."
      />
      <ClothingList products={products} isLoading={isLoading} category="women"  />
    </section>
  );
};

export default WomenPage;
