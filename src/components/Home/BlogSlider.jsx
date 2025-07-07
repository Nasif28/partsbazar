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

const BlogSlider = () => {
  const dispatch = useDispatch();
  const { popularBlogs, loading } = useSelector((state) => state.blogs);
  const [api, setApi] = React.useState();

  useEffect(() => {
    dispatch(fetchPopularBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="bg-secondary py-6">
      <div className="myContainer">
        <div className="container mx-auto">
          <div className="flex items-center mb-8 gap-2">
            <h2 className="text-2xl font-bold whitespace-nowrap">
              Latest Blogs
            </h2>

            <div className="w-full border-t border-primary mx-4"></div>

            <Link
              href="/blogs"
              className="bg-primary hover:bg-primary-dark rounded-3xl px-3 py-1.5 text-white text-xs font-bold flex items-center gap-1 whitespace-nowrap"
            >
              All Blogs
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

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
                opts={{
                  align: "start",
                  slidesToScroll: 1,
                }}
                setApi={setApi}
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
