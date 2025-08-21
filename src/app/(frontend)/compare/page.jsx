"use client";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { removeFromCompare, clearCompare } from "@/redux/features/compareSlice";
import { toast } from "sonner";
import { addToCart } from "@/redux/features/cartSlice";
import PageHeader from "@/components/Global/PageHeader";
import { Separator } from "@/components/ui/separator";

const ComparePage = () => {
  const dispatch = useDispatch();
  const compareProducts = useSelector((state) => state.compare.products);

  // Handle remove from compare
  const handleRemove = (productId) => {
    dispatch(removeFromCompare(productId));
    toast.info("Product removed from compare");
  };

  // Handle clear all
  const handleClearAll = () => {
    dispatch(clearCompare());
    toast.info("Compare list cleared");
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart");
  };

  // Get all unique specifications from compared products
  const allSpecifications = Array.from(
    new Set(compareProducts.flatMap((product) => product.specifications || []))
  );

  if (compareProducts.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="bg-card rounded-xl p-8 max-w-md mx-auto border border-border">
          <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <X className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold mb-4">No Products to Compare</h1>
          <p className="text-muted-foreground mb-6">
            Add products to compare their features and specifications.
          </p>
          <Button
            asChild
            className="bg-primary hover:bg-primary-dark text-primary-foreground"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <PageHeader
        title="Compare Products"
        description="Add products to compare and see their features side-by-side here"
      />

      <section className="myContainer">
        <div className="container mx-auto py-6">
          <div className="flex justify-between items-start md:items-center gap-4 mb-4">
            <h1 className="text-xl md:text-2xl font-bold">Compare Products</h1>

            <div className="flex gap-2">
              <Button asChild variant="">
                <Link href="/products">Add More Products</Link>
              </Button>

              <Button
                variant="outline"
                onClick={handleClearAll}
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                Clear All
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Products Row */}
              <div className="grid grid-cols-5 md:gap-4 gap-1 mb-6">
                <div className="col-span-1"></div> {/* Empty cell for specs */}
                {compareProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card border border-border rounded-lg p-4 relative"
                  >
                    <Button
                      onClick={() => handleRemove(product.id)}
                      variant="ghost"
                      className="absolute top-0 right-0 z-10"
                      aria-label="Remove product"
                    >
                      <X className="h-5 w-5" />
                    </Button>

                    <div className="h-50 mb-4 relative">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <h3 className="font-bold text-md mb-2 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="mb-4">
                      {product.discountPrice ? (
                        <>
                          <span className="text-lg font-bold text-primary">
                            ৳{product.discountPrice.toLocaleString()}
                          </span>
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            ৳{product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-primary">
                          ৳{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add To Cart
                    </Button>
                  </div>
                ))}
              </div>

              {/* Specifications */}
              <div className="">
                <h2 className="text-xl font-bold mb-4">Specifications</h2>

                {allSpecifications.map((spec, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 border-b gap-4 py-3 px-2 even:bg-muted/10"
                  >
                    <div className="col-span-1 font-medium text-muted-foreground">
                      {spec}
                    </div>

                    {compareProducts.map((product) => (
                      <div
                        key={`${product.id}-${spec}`}
                        className="text-foreground"
                      >
                        {product.specifications?.includes(spec) ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Ratings */}
                <div className="grid grid-cols-5 gap-4 py-3 px-2 even:bg-muted/10">
                  <div className="col-span-1 font-medium text-muted-foreground">
                    Rating
                  </div>

                  {compareProducts.map((product) => (
                    <div
                      key={`${product.id}-rating`}
                      className="flex items-center"
                    >
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                        {product.rating}/5
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Stock Status */}
                <div className="grid grid-cols-5 gap-4 py-3 px-2 even:bg-muted/10">
                  <div className="col-span-1 font-medium text-muted-foreground">
                    Availability
                  </div>

                  {compareProducts.map((product) => (
                    <div key={`${product.id}-stock`}>
                      {product.inStock ? (
                        <span className="text-green-600 font-medium">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-destructive font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ComparePage;
