"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrands, fetchTopBrands } from "@/redux/features/brandsSlice";
import BrandCard from "@/components/brands/BrandCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const Brands = () => {
  const dispatch = useDispatch();
  const { allBrands, topBrands, loading, error } = useSelector(
    (state) => state.brands
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("top");

  useEffect(() => {
    if (activeTab === "top" && topBrands.length === 0) {
      dispatch(fetchTopBrands());
    }

    if (activeTab === "all" && allBrands.length === 0) {
      dispatch(fetchAllBrands());
    }
  }, [activeTab, dispatch, topBrands.length, allBrands.length]);

  // Filter brands based on search term
  const filteredAllBrands = allBrands.filter((brand) =>
    brand.bname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTopBrands = topBrands.filter((brand) =>
    brand.bname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-10">
      <div className="myContainer">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All Brands</h1>
            <p className="max-w-2xl mx-auto">
              Explore our wide range of automotive brands. Find the perfect
              parts for your vehicle from trusted manufacturers.
            </p>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
            <Tabs defaultValue="top" className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="top"
                  className={`${
                    activeTab === "top" ? "text-primary" : ""
                  } font-semibold`}
                  onClick={() => setActiveTab("top")}
                >
                  Top Brands
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className={`${
                    activeTab === "all" ? "text-primary" : ""
                  } font-semibold`}
                  onClick={() => setActiveTab("all")}
                >
                  All Brands
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="w-full md:w-64">
              <Input
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-center py-8 text-primary">Error: {error}</div>
          )}

          {loading &&
          (activeTab === "top"
            ? topBrands.length === 0
            : allBrands.length === 0) ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 18 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm"
                >
                  <Skeleton className="w-24 h-24 rounded-full mb-3" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {activeTab === "top" ? (
                filteredTopBrands.length > 0 ? (
                  filteredTopBrands.map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    No brands found matching "{searchTerm}"
                  </div>
                )
              ) : filteredAllBrands.length > 0 ? (
                filteredAllBrands.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  No brands found matching "{searchTerm}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brands;
