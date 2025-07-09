"use client";
import React from "react";
import ProductGrid from "@/components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/features/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg animate-pulse h-64"
            />
          ))}
        </div>
      ) : (
        <ProductGrid products={allProducts} />
      )}
    </div>
  );
};

export default HomePage;
