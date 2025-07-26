import Categories from "@/components/Categories/Categories";
import PageHeader from "@/components/Global/PageHeader";
import React from "react";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="All Categories"
        description="Browse our wide range of automotive categories. Find the perfect parts for your vehicle from our organized categories."
      />

      <Categories />
    </div>
  );
};

export default CategoriesPage;
