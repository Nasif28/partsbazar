"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Heart, Scale } from "lucide-react";

export default function ProductModal({
  onAddToCart,
  product,
  open,
  onOpenChange,
  inWishlist,
  onAddToWishlist,
  inCompare,
  onAddToCompare,
}) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-card">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative h-64 w-full bg-muted">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.brand}
            </p>

            <div className="flex items-center gap-4 my-2">
              {product.discountPrice > 0 && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium">
                  {product.discountPrice}% OFF
                </span>
              )}

              {product.inStock ? (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="flex items-center">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold">
                    ৳{product.discountPrice.toLocaleString()}
                  </span>
                  <span className="ml-2 text-lg text-muted-foreground line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-muted-foreground">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="my-4">
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div>
              <h3 className="font-medium">Specifications</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                {product.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 py-4">
              <Button
                variant="outline"
                // className="flex-1"
                onClick={onAddToWishlist}
              >
                <Heart
                  className={`h-4 w-4 ${
                    inWishlist ? "fill-current text-red-500" : ""
                  }`}
                />
                {/* Wishlist */}
              </Button>

              <Button
                variant="outline"
                // className="flex-1"
                onClick={onAddToCompare}
              >
                <Scale
                  className={`h-4 w-4 ${inCompare ? "text-primary" : ""}`}
                />
                {/* {inCompare ? "Remove Compare" : "Compare"} */}
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button onClick={onAddToCart} className="flex-1">
                Add To Cart
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href={`/products/${product.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
