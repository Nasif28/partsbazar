"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/features/productSlice";
import ProductGrid from "../Global/GlobalProduct/ProductGrid";

const HomePage = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="py-6">
      <div className="myContainer">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">Featured Products</h1>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-F rounded-lg animate-pulse h-64"
                />
              ))}
            </div>
          ) : (
            <ProductGrid products={allProducts.slice(0, 5)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
