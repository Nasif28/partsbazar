import BlogSlider from "@/components/Home/BlogSlider";
import CategorizedProducts from "@/components/Home/CategorizedProducts/CategorizedProducts";
import Prod from "@/components/Home/CategorizedProducts/Prod";
import CategoryTab from "@/components/Home/CategorizedProducts/CategoryTab";
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
      {/* <Products /> */}
      <TopProducts />
      <CategorizedProducts />
      <CategoryTab />
      <Prod />
    </div>
  );
}
