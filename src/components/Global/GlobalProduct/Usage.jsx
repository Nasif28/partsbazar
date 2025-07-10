// Using in a Slider
import SectionSlider from "../SectionSlider";
<SectionSlider
  items={products}
  loading={loading}
  itemClassName="md:basis-1/5"
  renderItem={(product) => <ProductCardContainer product={product} />}
/>;

// Using in a Grid (No Slider)

import ProductGrid from "./ProductGrid";
<ProductGrid products={products} />;

// Using Standalone Product Card
import ProductCardContainer from "@/components/Products/ProductCardContainer";
<ProductCardContainer product={product} />;
