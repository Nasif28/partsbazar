"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "@/components/Categories/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTopCategories } from "@/redux/features/categoriesSlice";
import SectionHeader from "../Global/SectionHeader";

const TopCategories = () => {
  const dispatch = useDispatch();
  const {
    topCategories = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.categories || {});

  const flattenedCategories = [];
  topCategories.forEach((category) => {
    flattenedCategories.push({ ...category, isSubcategory: false });
    category.subcategories.forEach((subcategory) => {
      flattenedCategories.push({ ...subcategory, isSubcategory: true });
    });
  });

  const displayCategories = flattenedCategories.slice(0, 8);

  useEffect(() => {
    if (topCategories.length === 0) {
      dispatch(fetchTopCategories());
    }
  }, [dispatch, topCategories.length]);

  if (error) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center py-8 text-primary">
            Error loading categories: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="myContainer">
      <div className="container mx-auto py-6">
        <SectionHeader
          title="Top Categories"
          href="/categories"
          linkText="All Categories"
        />

        {loading && topCategories.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-lg shadow-sm border border-border overflow-hidden"
              >
                <Skeleton className="w-full h-40" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayCategories.map((category) => (
              <CategoryCard
                key={`${category.id}-${category.isSubcategory}`}
                category={category}
                isSubcategory={category.isSubcategory}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCategories;
