import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductGallery = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // If we only have one image, use it for all thumbnails
  const images = product.images || [
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
  ];

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative min-h-[520px] max-h-[520px] w-full overflow-hidden rounded-xl bg-mute">
        {images[currentImageIndex] ? (
          <Image
            src={images[currentImageIndex]}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-gray-800" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-gray-800" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 mt-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 ${
              index === currentImageIndex
                ? "border-primary"
                : "border-transparent hover:border-gray-300"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={img}
              alt={`${product.title} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
