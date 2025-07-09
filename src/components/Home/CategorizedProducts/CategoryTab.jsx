"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/components/Products/ProductCard";
import SectionSlider from "@/components/Global/SectionSlider";
import { fetchProducts } from "@/redux/features/productSlice";
import { categories, categoryIcons } from "./Categories";

const CategoryTab = () => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const { allProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products by active category
  const getProductsByCategory = (category) => {
    return allProducts.filter((product) => product.category === category);
  };

  const activeProducts = getProductsByCategory(activeCategory);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <span>{categoryIcons[category]}</span>
              <span className="whitespace-nowrap">
                {category.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Category Section */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">
            {categoryIcons[activeCategory]} {activeCategory}
          </h2>
        </div>

        {/* Products Slider */}
        <SectionSlider
          items={activeProducts}
          loading={loading}
          itemClassName="md:basis-1/5"
          renderItem={(product) => <ProductCard product={product} />}
          emptyMessage={`No products found in ${activeCategory}`}
        />
      </div>
    </div>
  );
};

export default CategoryTab;
