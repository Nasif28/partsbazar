import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Share2,
  BarChart2,
  ShoppingCart,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";
import SocialShare from "./SocialShare";
import { toast } from "sonner";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSocialShare, setShowSocialShare] = useState(false);

  const handleAddToCart = () => {
    toast.success(`${product.title} has been added to your cart`);
  };

  const handleBuyNow = () => {
    toast.success("Redirecting to checkout page...");
  };

  const handleWhatsAppOrder = () => {
    const message = `I'd like to order: ${product.title} (${product.partsNo}) - Quantity: ${quantity}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl md:text-3xl font-bold ">{product.title}</h1>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : "fill-none stroke-muted-foreground"}`}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-muted-foreground">
            ({product.reviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold ">
            ৳{product.discountPrice.toLocaleString()}
          </span>
          {product.discountPrice < product.price && (
            <>
              <span className="ml-3 text-lg text-muted-foreground line-through">
                ৳{product.price.toLocaleString()}
              </span>
              <span className="ml-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded-lg">
                {Math.round(
                  100 - (product.discountPrice / product.price) * 100
                )}
                % OFF
              </span>
            </>
          )}
        </div>

        <div className="flex items-center text-sm">
          <span className="">SKU:</span>
          <span className="ml-2 font-medium">{product.partsNo}</span>
        </div>

        <div className="flex items-center">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
          ></span>
          <span className={product.inStock ? "text-green-700" : "text-red-700"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </span>
          <span className="ml-4 text-gray-600 text-sm">
            {product.orderCount} orders
          </span>
        </div>
      </div>

      <div className="">
        <h3 className="text-lg font-medium mb-2">Specifications:</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {product.specifications.map((spec, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="">{spec}</span>
            </li>
          ))}
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="">Weight: {product.weight} kg</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="">Imported by: {product.importedBy}</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="">Warranty: {product.warranty}</span>
          </li>
        </ul>
      </div>

      <div className="">
        <div className="flex mb-4 gap-4 items-center">
          <div className="flex items-center">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 "
                disabled={quantity <= 1}
              >
                -
              </button>

              <span className="px-3 py-1 border-l border-r">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"

              // onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              // onClick={handleAddToCompare}
            >
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Compare</span>
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowSocialShare(!showSocialShare)}
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          <Button onClick={handleAddToCart} className="h-12">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>

          <Button onClick={handleBuyNow} variant="outline" className="h-12">
            <ShoppingBag className="mr-2 h-4 w-4" /> Buy Now
          </Button>

          <Button
            onClick={handleWhatsAppOrder}
            variant="highlight"
            className="h-12"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Order via WhatsApp
          </Button>
        </div>
      </div>

      {showSocialShare && (
        <div className="pt-4">
          <SocialShare product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
