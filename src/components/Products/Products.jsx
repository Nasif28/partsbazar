"use client";
import { useState } from "react";
import productsData from "@/data/Products.json";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function Products() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [cart, setCart] = useState([]);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleAddToWishlist = (product) => {
    setWishlist([...wishlist, product]);
    alert(`Added ${product.title} to wishlist!`);
  };

  const handleAddToCompare = (product) => {
    setCompareList([...compareList, product]);
    alert(`Added ${product.title} to compare!`);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`Added ${product.title} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Automotive Products
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {productsData.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToWishlist={handleAddToWishlist}
              onAddToCompare={handleAddToCompare}
              onQuickView={handleQuickView}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          open={!!quickViewProduct}
          onOpenChange={(open) => !open && setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
