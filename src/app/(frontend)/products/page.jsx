import ProductFilter from "@/components/Products/ProductFilter";
import Products from "@/components/Products/Products";
import React, { Suspense } from "react";
import ProdTab from "@/components/Products/ProdTab";

const ProductsPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProdTab />
        <ProductFilter />
        <Products />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
