import BlogSlider from "@/components/Home/BlogSlider";
import FAQSection from "@/components/Home/FAQSection";
import Features from "@/components/Home/Features";
import HeroBanner from "@/components/Home/Hero/HeroBanner";
import Partners from "@/components/Home/Partners";
import ProductTab from "@/components/Home/ProductTab";
import Testimonial from "@/components/Home/Testimonial/Testimonial";
import TopBrands from "@/components/Home/TopBrands";
import TopCategories from "@/components/Home/TopCategories";
import TopProducts from "@/components/Home/TopProducts";
import VideoSlider from "@/components/Home/VideoSlider";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading.....</div>}>
        <HeroBanner />
        <Features />
        <TopBrands />
        <TopCategories />
        <BlogSlider />
        <VideoSlider />
        <TopProducts />
        {/* <ProductCategorized /> */}
        <ProductTab />
        <Partners />
        <FAQSection />
        <Testimonial />
      </Suspense>
    </div>
  );
}
