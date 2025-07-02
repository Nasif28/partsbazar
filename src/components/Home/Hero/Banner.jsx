"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "DOWNLOAD SCHAI APP",
      subtitle: "YOUR PRODUCTS NOW",
      description: "All vehicle parts available in Parts Bazar",
      cta: "Download Now",
      bgColor: "from-blue-800 to-blue-600",
    },
    {
      title: "SUMMER SALE",
      subtitle: "UP TO 50% OFF",
      description: "Special discounts on all car accessories",
      cta: "Shop Now",
      bgColor: "from-orange-500 to-amber-500",
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "LATEST PARTS IN STOCK",
      description: "Check out our newest products",
      cta: "Explore",
      bgColor: "from-green-600 to-emerald-500",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center p-8 transition-opacity duration-500 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}
          ></div>
          <div className="relative z-10 text-white max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {slide.title}
            </h2>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              {slide.subtitle}
            </h1>
            <p className="mb-6">{slide.description}</p>
            <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 px-8 py-6 text-lg">
              {slide.cta}
            </Button>
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-contain bg-no-repeat bg-right bg-[url('/car-parts-app.png')]"></div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 text-white hover:bg-white/50 z-20"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 text-white hover:bg-white/50 z-20"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-8" : "bg-white/50"
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
