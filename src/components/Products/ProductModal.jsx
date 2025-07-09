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

export default function ProductModal({ product, open, onOpenChange }) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative h-64 w-full bg-gray-50">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{product.brand}</p>

            <div className="mt-4 flex items-center">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold text-gray-900">
                    ৳{product.discountPrice.toLocaleString()}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="mt-4">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-900">Specifications</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                {product.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex space-x-4">
              <Button className="flex-1">Add To Cart</Button>
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
