"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/components/Products/ProductCard";
import SectionHeader from "@/components/Global/SectionHeader";
import SectionSlider from "@/components/Global/SectionSlider";
import { fetchProducts } from "@/redux/features/productSlice";
import { categories, categoryIcons, getCategorySlug } from "./Categories";


const CategorizedProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products by category
  const getProductsByCategory = (category) => {
    return allProducts.filter((product) => product.category === category);
  };

  return (
    <div className="space-y-16 py-12 bg-gray-50">
      {categories.map((category) => {
        const categoryProducts = getProductsByCategory(category);
        const categorySlug = getCategorySlug(category);

        if (categoryProducts.length === 0) return null;

        return (
          <section key={categorySlug} className="container mx-auto px-4">
            <SectionHeader
              title={
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{categoryIcons[category]}</span>
                  <span>{category}</span>
                </div>
              }
              href={`/products?category=${categorySlug}`}
              linkText={`View All ${category}`}
            />

            <SectionSlider
              items={categoryProducts}
              loading={loading}
              itemClassName="md:basis-1/5"
              renderItem={(product) => <ProductCard product={product} />}
            />
          </section>
        );
      })}
    </div>
  );
};

export default CategorizedProducts;
