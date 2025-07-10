"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionHeader from "@/components/Global/SectionHeader";
import SectionSlider from "@/components/Global/SectionSlider";
import { fetchProducts } from "@/redux/features/productSlice";
import { categories, categoryIcons, getCategorySlug } from "./Categories";
import ProductCardContainer from "@/components/Global/GlobalProduct/ProductCardContainer";

const CategorizedProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const categories = [
  //   "Car Parts & Accessories",
  //   "Bike Parts & Accessories",
  //   "Electrical & Electronics",
  //   "Industrial Equipment & Components",
  //   "Heavy Vehicle",
  //   "Hybrid Car Battery",
  //   "Tools & Hardware",
  //   "Electronics Devices & Accessories",
  //   "Health & Medicine",
  //   "Agriculture & Food",
  //   "Agricultural Machinery",
  //   "Wholesale Products",
  // ];
  const selectedCategories = ["Car Parts & Accessories", "Tools & Hardware"];

  // Filter products by category
  const getProductsByCategory = (category) => {
    return allProducts.filter((product) => product.category === category);
  };

  // Determine which categories to display
  const categoriesToDisplay =
    selectedCategories.length > 0
      ? categories.filter((cat) => selectedCategories.includes(cat))
      : categories;

  return (
    <div>
      {categoriesToDisplay.map((category) => {
        const categoryProducts = getProductsByCategory(category);
        const categorySlug = getCategorySlug(category);

        if (categoryProducts.length === 0) return null;

        return (
          <section key={categorySlug} className="bg-secondary py-6">
            <div className="myContainer">
              <div className="container mx-auto">
                <SectionHeader
                  title={
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {categoryIcons[category]}
                      </span>
                      <span>{category}</span>
                    </div>
                  }
                  href={`/products?category=${categorySlug}`}
                  linkText={`All ${category}`}
                />

                <SectionSlider
                  items={categoryProducts}
                  loading={loading}
                  itemClassName="md:basis-1/5"
                  renderItem={(product) => (
                    <ProductCardContainer product={product} />
                  )}
                />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CategorizedProducts;
