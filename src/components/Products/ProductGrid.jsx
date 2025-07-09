"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { addToWishlist, removeFromWishlist } from "@/redux/features/wishlistSlice";
import { addToCart } from "@/redux/features/cartSlice";
import { addToCompare } from "@/redux/features/compareSlice";

const ProductGrid = ({
  products,
  gridClasses = "grid-cols-2 md:grid-cols-4 lg:grid-cols-5",
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const dispatch = useDispatch();

  // Get state from Redux
  const { items } = useSelector((state) => state.wishlist);
  //   const { isAuthenticated } = useSelector((state) => state.auth);
  const isAuthenticated = true;

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return items.some((item) => item.id === productId);
  };

  // Handle wishlist action with login check
  const handleWishlist = (product) => {
    if (!isAuthenticated) {
      toast.warning("Please login to add items to your wishlist");
      return;
    }

    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
      toast.info("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart");
  };

  // Handle add to compare
  const handleAddToCompare = (product) => {
    dispatch(addToCompare(product));
    toast.info("Added to compare");
  };

  return (
    <>
      <div className={`grid gap-4 ${gridClasses}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            inWishlist={isInWishlist(product.id)}
            onAddToWishlist={() => handleWishlist(product)}
            onAddToCart={() => handleAddToCart(product)}
            onAddToCompare={() => handleAddToCompare(product)}
            onQuickView={() => setQuickViewProduct(product)}
          />
        ))}
      </div>

      <ProductModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
        onAddToWishlist={handleWishlist}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductGrid;
