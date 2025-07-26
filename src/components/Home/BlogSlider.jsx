"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "@/components/Blogs/BlogCard";
import { fetchPopularBlogs } from "@/redux/features/blogSlice";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import SectionHeader from "../Global/SectionHeader";

const BlogSlider = () => {
  const dispatch = useDispatch();
  const { popularBlogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchPopularBlogs());
  }, [dispatch]);

  return (
    <section className="bg-secondary py-6">
      <div className="myContainer">
        <div className="container mx-auto">
          <SectionHeader
            title=" Latest Blogs"
            href="/blogs"
            linkText="All Blogs"
          />

          {loading ? (
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
          ) : (
            <div className="relative">
              <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
                className="w-full"
              >
                <CarouselContent>
                  {popularBlogs.map((blog) => (
                    <CarouselItem key={blog.id} className="md:basis-1/3 ">
                      <div className="rounded-lg">
                        <BlogCard blog={blog} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="left-2 2xl:-left-12" />
                <CarouselNext className="right-2 2xl:-right-12" />
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
