"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/wishlistSlice";
import { addToCart } from "@/redux/features/cartSlice";
import { addToCompare, removeFromCompare } from "@/redux/features/compareSlice";

const ProductCardContainer = ({ product }) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const dispatch = useDispatch();

  // Get state from Redux
  const { items } = useSelector((state) => state.wishlist);
  const { products: compareProducts } = useSelector((state) => state.compare);

  const isAuthenticated = true; // Replace with actual auth check

  // Check if product is in wishlist
  const isInWishlist = items.some((item) => item.id === product.id);

  // Check if product is in compare
  const isInCompare = compareProducts.some((p) => p.id === product.id);

  // Handle wishlist action with login check
  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to add items to your wishlist");
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.info("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart");
  };

  // Handle add to compare
  const handleAddToCompare = () => {
    if (isInCompare) {
      dispatch(removeFromCompare(product.id));
      toast.info("Removed from compare");
    } else {
      // Check if we can add more products
      if (compareProducts.length >= 4) {
        toast.warning("You can compare up to 4 products at a time");
        return;
      }

      dispatch(addToCompare(product));
      toast.info("Added to compare");
    }
  };

  // Handle quick view
  const handleQuickView = () => {
    setQuickViewProduct(product);
  };

  return (
    <>
      <ProductCard
        product={product}
        inWishlist={isInWishlist}
        onAddToWishlist={handleWishlist}
        onAddToCart={handleAddToCart}
        inCompare={isInCompare}
        onAddToCompare={handleAddToCompare}
        onQuickView={handleQuickView}
      />

      <ProductModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
        inWishlist={isInWishlist}
        onAddToWishlist={handleWishlist}
        onAddToCart={handleAddToCart}
        onAddToCompare={handleAddToCompare}
        inCompare={isInCompare}
      />
    </>
  );
};

export default ProductCardContainer;
