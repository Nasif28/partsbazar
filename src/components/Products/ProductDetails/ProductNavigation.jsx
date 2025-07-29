import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProductNavigation = ({ prevProduct, nextProduct }) => {
  if (!prevProduct && !nextProduct) return null;

  return (
    <div className="flex justify-between items-center mb-6 gap-4">
      {/* Previous Product */}
      {prevProduct && (
        <TooltipProvider>
          <Link
            href={`/products/${prevProduct.id}`}
            className="flex items-center text-primary hover:text-primary-dark"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ChevronLeft className="h-4 w-4" />
              </TooltipTrigger>

              <TooltipContent
                side="bottom"
                align="end"
                className="bg-card p-3 max-w-xs border-border border cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden mr-3">
                    <img
                      src={prevProduct.imageUrl}
                      alt={prevProduct.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="text-foreground">
                    <div className="font-semibold text-sm">
                      {prevProduct.title}
                    </div>
                    <div className="font-bold mt-1">
                      ৳
                      {(
                        prevProduct.discountPrice || prevProduct.price
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </Link>
        </TooltipProvider>
      )}
      {/* All Products  */}
      <TooltipProvider>
        <Link href="/products" className="flex items-center">
          <Tooltip>
            <TooltipTrigger>
              <LayoutGrid className="w-4 h-4" />
            </TooltipTrigger>

            <TooltipContent
              side="bottom"
              className="bg-card text-foreground cursor-pointer border border-border"
            >
              All Products
            </TooltipContent>
          </Tooltip>
        </Link>
      </TooltipProvider>

      {/* Next Product */}
      {nextProduct && (
        <TooltipProvider>
          <Link
            href={`/products/${nextProduct.id}`}
            className="flex items-center text-primary hover:text-primary-dark ml-auto"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ChevronRight className="h-4 w-4" />
              </TooltipTrigger>

              <TooltipContent
                side="bottom"
                align="end"
                className="bg-card p-3 max-w-xs border border-border cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden mr-3">
                    <img
                      src={nextProduct.imageUrl}
                      alt={nextProduct.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-foreground">
                    <div className="font-semibold text-sm">
                      {nextProduct.title}
                    </div>
                    <div className="font-bold mt-1">
                      ৳
                      {(
                        nextProduct.discountPrice || nextProduct.price
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </Link>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ProductNavigation;
