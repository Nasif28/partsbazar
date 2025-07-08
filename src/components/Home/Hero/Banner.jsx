"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const getBannerImages = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "DOWNLOAD SCHAI APP",
          subtitle: "YOUR PRODUCTS NOW",
          description: "All vehicle parts available in Parts Bazar",
          cta: "Download Now",
          imageUrl:
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&h=600",
        },
        {
          id: 2,
          title: "SUMMER SALE",
          subtitle: "UP TO 50% OFF",
          description: "Special discounts on all car accessories",
          cta: "Shop Now",
          imageUrl:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&h=600",
        },
        {
          id: 3,
          title: "NEW ARRIVALS",
          subtitle: "LATEST PARTS IN STOCK",
          description: "Check out our newest products",
          cta: "Explore",
          imageUrl:
            "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&h=600",
        },
      ]);
    }, 800);
  });
};

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getBannerImages();
        setSlides(data);
      } catch (error) {
        console.error("Failed to fetch banner images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (loading) {
    return (
      <div className="relative w-full h-[300px] md:h-[390px] rounded-xl overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] md:h-[390px] rounded-xl overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex items-center p-8 transition-opacity duration-500 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background image with gradient overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>

          <div className="relative z-10 text-white max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {slide.title}
            </h2>

            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              {slide.subtitle}
            </h1>

            <p className="mb-6">{slide.description}</p>

            <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg">
              {slide.cta}
            </Button>
          </div>
        </div>
      ))}

      <div className="hidden group-hover:flex">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 hidden transform -translate-y-1/2 bg-white/30 text-white hover:bg-white/50 z-10 md:flex md:group-hover:flex"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 text-white hover:bg-white/50 z-10 hidden md:flex md:group-hover:flex"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Mobile Navigation Arrows */}
      {/* <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/30 text-white hover:bg-white/50"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/30 text-white hover:bg-white/50"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </Button>
      </div> */}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
