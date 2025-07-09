// app/products/page.jsx
"use client";
import React, { useState } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductFilter = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);
  const [category, setCategory] = useState("all");

  React.useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Filter products by category
  const filteredProducts =
    category === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === category);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md px-4 py-2"
        >
          <option value="all">All Categories</option>
          <option value="Engine Oil">Engine Oil</option>
          <option value="Brake Pads">Brake Pads</option>
          <option value="Filters">Filters</option>
          <option value="Batteries">Batteries</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg animate-pulse h-64"
            />
          ))}
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default ProductFilter;
