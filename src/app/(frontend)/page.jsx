import BlogSlider from "@/components/Home/BlogSlider";
import CategorizedProducts from "@/components/Home/CategorizedProducts/CategorizedProducts";
import CategoryTab from "@/components/Home/CategorizedProducts/CategoryTab";
import Features from "@/components/Home/Features";
import HeroBanner from "@/components/Home/Hero/HeroBanner";
import TopBrands from "@/components/Home/TopBrands";
import TopProducts from "@/components/Home/TopProducts";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroBanner />
        <Features />
        <TopBrands />
        <BlogSlider />
        <TopProducts />
        <CategorizedProducts />
        <CategoryTab />
      </Suspense>
    </div>
  );
}
