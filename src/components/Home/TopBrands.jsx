"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import BrandCard from "@/components/Brands/BrandCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTopBrands } from "@/redux/features/brandsSlice";
import { ArrowRight, ChevronRight } from "lucide-react";
import SectionHeader from "../Global/SectionHeader";

const TopBrands = () => {
  const dispatch = useDispatch();
  const {
    topBrands = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.brands || {});

  useEffect(() => {
    // Only fetch if we don't have data or it's stale (older than 5 minutes)
    if (topBrands.length === 0) {
      dispatch(fetchTopBrands());
    }
  }, [dispatch, topBrands.length]);

  if (error) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center py-8 text-primary">
            Error loading brands: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="myContainer">
      <div className="container mx-auto py-6">
        <SectionHeader
          title="Top Brands"
          href="/brands"
          linkText="All Brands"
        />

        {loading && topBrands.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topBrands.slice(0, 12).map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopBrands;
