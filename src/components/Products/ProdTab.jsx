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
     
    </div>
  );
}
