"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopCategories,
  fetchAllCategories,
} from "@/redux/features/categoriesSlice";
import CategoryCard from "@/components/Categories/CategoryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const Categories = () => {
  const dispatch = useDispatch();
  const { topCategories, allCategories, loading, error } = useSelector(
    (state) => state.categories
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("top");
  const [flattenedCategories, setFlattenedCategories] = useState([]);
  const [flattenedTopCategories, setFlattenedTopCategories] = useState([]);

  useEffect(() => {
    if (activeTab === "top" && topCategories.length === 0) {
      dispatch(fetchTopCategories());
    }

    if (activeTab === "all" && allCategories.length === 0) {
      dispatch(fetchAllCategories());
    }
  }, [activeTab, dispatch, topCategories.length, allCategories.length]);

  // Flatten categories with their subcategories
  useEffect(() => {
    if (allCategories.length > 0) {
      const flat = [];
      allCategories.forEach((category) => {
        // Add main category
        flat.push({ ...category, isSubcategory: false });

        // Add all subcategories
        category.subcategories.forEach((subcategory) => {
          flat.push({ ...subcategory, isSubcategory: true });
        });
      });
      setFlattenedCategories(flat);
    }
  }, [allCategories]);

  // Flatten top categories with their subcategories
  useEffect(() => {
    if (topCategories.length > 0) {
      const flat = [];
      topCategories.forEach((category) => {
        // Add main category
        flat.push({ ...category, isSubcategory: false });

        // Add all subcategories
        category.subcategories.forEach((subcategory) => {
          flat.push({ ...subcategory, isSubcategory: true });
        });
      });
      setFlattenedTopCategories(flat);
    }
  }, [topCategories]);

  // Filter categories based on search term
  const filteredAllCategories = flattenedCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTopCategories = flattenedTopCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="myContainer">
      <div className="container mx-auto py-6">
        <div className="mb-6 flex gap-4 justify-between items-center">
          <Tabs defaultValue="top" className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="top"
                className={`${
                  activeTab === "top" ? "text-primary" : ""
                } font-semibold cursor-pointer`}
                onClick={() => setActiveTab("top")}
              >
                Top Categories
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className={`${
                  activeTab === "all" ? "text-primary" : ""
                } font-semibold cursor-pointer`}
                onClick={() => setActiveTab("all")}
              >
                All Categories
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="w-full md:w-64">
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="text-center py-8 text-primary">Error: {error}</div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
            {activeTab === "top" ? (
              filteredTopCategories.length > 0 ? (
                filteredTopCategories.map((category) => (
                  <CategoryCard
                    key={`${category.id}-${category.isSubcategory}`}
                    category={category}
                    isSubcategory={category.isSubcategory}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  No categories found matching "{searchTerm}"
                </div>
              )
            ) : filteredAllCategories.length > 0 ? (
              filteredAllCategories.map((category) => (
                <CategoryCard
                  key={`${category.id}-${category.isSubcategory}`}
                  category={category}
                  isSubcategory={category.isSubcategory}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                No categories found matching "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
