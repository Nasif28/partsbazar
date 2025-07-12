"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeader from "@/components/Global/SectionHeader";
import { fetchProducts } from "@/redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  categories,
  categoryIcons,
} from "../Home/CategorizedProducts/Categories";
import ProductCardContainer from "../Global/GlobalProduct/ProductCardContainer";

export default function ProdTab() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || categories[0]
  );

  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = allProducts.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className="myContainer">
      <div className="container mx-auto py-6">
        <SectionHeader title="Our Products" href="/" linkText="Back to Home" />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 text-sm py-2 rounded-lg gap-1 flex ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-secondary hover:bg-gray-400"
              }`}
            >
              <span>{categoryIcons[category]}</span>
              <span>{category}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {selectedCategory} ({filteredProducts.length})
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 animate-pulse"
              >
                <div className="bg-gray-200 h-40 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredProducts.slice(0, 5).map((product) => (
              <ProductCardContainer key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">
              No products found in {selectedCategory} category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
