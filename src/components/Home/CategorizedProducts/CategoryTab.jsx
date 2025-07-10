"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/components/Global/GlobalProduct/ProductCard";
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
    <section className="py-6 ">
      <div className="myContainer">
        <div className="container mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg flex text-sm items-center gap-1 transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-secondary hover:bg-gray-500"
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
            <h2 className="text-2xl font-bold">
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
    </section>
  );
};

export default CategoryTab;
