"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import TestimonialCard from "./TestimonialCard";
import ReviewForm from "./ReviewForm";
import testimonialsData from "@/data/Testimonials.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AvatarGroup from "./AvatarGroup";
import { toast } from "sonner";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmitReview = (newReview) => {
    const id = Math.max(...testimonials.map((t) => t.id)) + 1;

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const reviewToAdd = {
      ...newReview,
      id,
      date: formattedDate,
      featured: true,
      category: "Customer Review",
      purchase: "Not specified",
      location: newReview.address || "Not specified",
    };

    setTestimonials([...testimonials, reviewToAdd]);
    setIsFormOpen(false);
    toast.info(" Your review has been successfully submitted");
  };

  return (
    <section
      className="py-12 relative"
      style={{
        backgroundImage: `url(/Testimonial.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: "scaleX(-1)",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="myContainer" style={{ transform: "scaleX(-1)" }}>
        <div className="container mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-center">
            {/* Left Column: Heading and Button */}
            <div className="text-center lg:text-left space-y-4 lg:space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl md:max-w-sm font-bold text-white mb-2 lg:mx-0 mx-auto">
                  What Our Customers Say About Us
                </h2>

                <div className="bg-primary h-1 w-24 lg:mx-0 mx-auto"></div>
              </div>

              <p className="text-lg text-white">
                We have <span className="font-bold text-primary">500+</span>{" "}
                positive customer reviews
              </p>

              {/* Avatar Group */}
              <div className="">
                <AvatarGroup testimonials={testimonials} />
              </div>

              <Button
                onClick={() => setIsFormOpen(true)}
                size="lg"
                className="py-6 px-8 text-lg"
              >
                Write a Review
              </Button>
            </div>

            {/* Right Column: Carousel */}
            <div className="lg:pl-12 col-span-2">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((testimonial) => (
                    <CarouselItem
                      key={testimonial.id}
                      className="sm:basis-1/2 basis-1/1"
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="">
                  <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 md:-translate-x-2 cursor-pointer bg-white/50 rounded-full p-2 shadow-md hover:bg-gray-100 transition-all" />
                  <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-4 -translate-x-2 cursor-pointer bg-white/50 rounded-full p-2 shadow-md hover:bg-gray-100 transition-all" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      <ReviewForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitReview}
      />
    </section>
  );
};

export default Testimonial;
