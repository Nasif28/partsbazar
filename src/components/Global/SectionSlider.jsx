"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SectionSlider = ({
  items,
  renderItem,
  loading,
  loadingComponent,
  className = "",
  itemClassName = "md:basis-1/3",
  autoplayOptions = { delay: 3000, stopOnInteraction: false },
  showArrows = true,
  opts = { align: "start", loop: true },
  emptyMessage = "No items found",
}) => {
  if (loading) {
    return (
      loadingComponent || (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="bg-background h-60" />
              <div className="p-4">
                <div className="h-6 bg-background rounded w-3/4 mb-2" />
                <div className="h-4 bg-background rounded w-full mb-1" />
                <div className="h-4 bg-background rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="relative">
      <Carousel
        opts={opts}
        plugins={autoplayOptions ? [Autoplay(autoplayOptions)] : []}
        className={className}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className={itemClassName}>
              {renderItem(item)}
            </CarouselItem>
          ))}
        </CarouselContent>
        {showArrows && (
          <>
            <CarouselPrevious className="left-2 2xl:-left-12" />
            <CarouselNext className="right-2 2xl:-right-12" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default SectionSlider;
