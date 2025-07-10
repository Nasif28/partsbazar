"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionHeader from "../Global/SectionHeader";
import SectionSlider from "../Global/SectionSlider";
import { fetchProducts } from "@/redux/features/productSlice";
import ProductCardContainer from "../Global/GlobalProduct/ProductCardContainer";

const TopProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Top Products"
          href="/products?top=true"
          linkText="All Top Products"
        />

        <SectionSlider
          items={allProducts}
          loading={loading}
          itemClassName="md:basis-1/5"
          renderItem={(product) => <ProductCardContainer product={product} />}
        />
      </div>
    </section>
  );
};

export default TopProducts;
