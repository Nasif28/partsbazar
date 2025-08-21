"use client";
import React from "react";
import ProductCardContainer from "./ProductCardContainer";

const ProductGrid = ({
  products,
  gridClasses = "grid-cols-2 md:grid-cols-4 lg:grid-cols-5",
}) => {
  return (
    <div className={`grid sm:gap-4 gap-2 ${gridClasses}`}>
      {products.map((product) => (
        <ProductCardContainer key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
