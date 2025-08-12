"use client";
import { ProductForm } from "@/components/Admin/Product/ProductForm";

const AddProductPage = () => {
  const handleSubmit = async (productData) => {
    console.log("Creating product:", productData);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return <ProductForm onSubmit={handleSubmit} />;
};

export default AddProductPage;
