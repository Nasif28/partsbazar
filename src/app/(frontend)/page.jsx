import BlogSlider from "@/components/Home/BlogSlider";
import Features from "@/components/Home/Features";
import HeroBanner from "@/components/Home/Hero/HeroBanner";
import TopBrands from "@/components/Home/TopBrands";
import TopProducts from "@/components/Home/TopProducts";
import Products from "@/components/Products/Products";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <Features />
      <TopBrands />
      <BlogSlider />
      <Products />
      <TopProducts />
    </div>
  );
}
