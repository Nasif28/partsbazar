import React from "react";
import Brands from "@/components/Brands/Brands.jsx";
import PageHeader from "@/components/Global/PageHeader";

const BrandsPage = () => {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="All Brands"
        description="Explore our wide range of automotive brands. Find the perfect parts for your vehicle from trusted manufacturers."
      />

      <Brands />
    </div>
  );
};

export default BrandsPage;
