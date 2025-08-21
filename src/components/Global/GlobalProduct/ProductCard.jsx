"use client";
import { Heart, Eye, Scale, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PBLogo } from "@/assets/Import";

export default function ProductCard({
  product,
  inWishlist,
  onAddToWishlist,
  onAddToCart,
  inCompare,
  onAddToCompare,
  onQuickView,
}) {
  // Calculate discount percentage
  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      {/* Discount badge */}
      {discountPercentage > 0 && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Image with background logo */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-52 w-full overflow-hidden bg-muted">
          {/* Background Logo */}
          <div className="absolute inset-0 z-0">
            <Image
              src={PBLogo}
              alt="Background Logo"
              fill
              className="object-contain opacity-10"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Product Image */}
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="relative object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Action buttons */}
      <div className="absolute right-3 top-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={onAddToWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-4 w-4 ${
              inWishlist ? "fill-current text-red-500" : ""
            }`}
          />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={onQuickView}
          aria-label="Quick view"
        >
          <Eye className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={onAddToCompare}
          aria-label="Add to compare"
        >
          <Scale className={`h-4 w-4 ${inCompare ? "text-primary" : ""}`} />
        </Button>
      </div>

      {/* Product info */}
      <div className="p-4 space-y-1">
        <span className="text-xs font-medium text-muted-foreground">
          {product.brand}
        </span>

        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-medium line-clamp-2">{product.title}</h3>
        </Link>

        <div>
          {product.inStock ? (
            <span className="text-xs font-medium text-green-600">In stock</span>
          ) : (
            <span className="text-xs font-medium text-red-600">
              Out of stock
            </span>
          )}
        </div>

        <div className="flex items-center">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold">
                ৳{product.discountPrice.toLocaleString()}
              </span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ৳{product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">
              ৳{product.price.toLocaleString()}
            </span>
          )}
        </div>

        <Button className="mt-2 w-full" onClick={onAddToCart}>
          <ShoppingCart className="h-4 w-4" /> Add To Cart
        </Button>
      </div>
    </div>
  );
}
