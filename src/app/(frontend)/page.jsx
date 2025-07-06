import BlogSlider from "@/components/Home/BlogSlider";
import Features from "@/components/Home/Features";
import HeroBanner from "@/components/Home/Hero/HeroBanner";
import TopBrands from "@/components/Home/TopBrands";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <Features />
      <TopBrands />
      <BlogSlider />
    </div>
  );
}
