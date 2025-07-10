"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../Global/GlobalProduct/ProductGrid";
import { fetchProducts } from "@/redux/features/productSlice";
import { categories } from "../Home/CategorizedProducts/Categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ProductFilter = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);
  const [category, setCategory] = useState("all");

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts =
    category === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === category);

  return (
    <section className="bg-secondary py-6">
      <section className="myContainer">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>

            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger className="w-xs">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem key="all" value="all">
                  All Categories
                </SelectItem>

                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="bg-secondary rounded-lg animate-pulse h-64"
                />
              ))}
            </div>
          ) : (
            <ProductGrid products={filteredProducts.slice(0, 5)} />
          )}
        </div>
      </section>
    </section>
  );
};

export default ProductFilter;
