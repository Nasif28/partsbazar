import ProductFilter from "@/components/Products/ProductFilter";
import Products from "@/components/Products/Products";
import React from "react";
import ProdTab from "@/components/Products/ProdTab";

const ProductsPage = () => {
  return (
    <div>
      <ProdTab />
      <ProductFilter />
      <Products />
    </div>
  );
};

export default ProductsPage;
