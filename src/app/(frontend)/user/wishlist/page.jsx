"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import ProductGrid from "@/components/Global/GlobalProduct/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const WishlistPage = () => {
  const { items } = useSelector((state) => state.wishlist);

  return (
    <section className="myContainer">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Wishlist</h1>
          <Link href="/products" className="">
            <Button variant="outline">
              Continue Shopping <ArrowRight />
            </Button>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <ProductGrid
            products={items}
            gridClasses="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          />
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
