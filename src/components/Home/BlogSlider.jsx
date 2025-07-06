"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "@/components/Blogs/BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchPopularBlogs } from "@/redux/features/blogSlice";
import Link from "next/link";

const BlogSlider = () => {
  const dispatch = useDispatch();
  const { popularBlogs, loading } = useSelector((state) => state.blogs);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slidesToShow = 3;

  useEffect(() => {
    dispatch(fetchPopularBlogs());
  }, [dispatch]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev >= popularBlogs.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? popularBlogs.length - slidesToShow : prev - 1
    );
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Latest Blogs</h2>
          <Link
            href="/blogs"
            className="text-blue-600 hover:underline font-medium"
          >
            View All Blogs
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="bg-gray-200 h-60" />
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / slidesToShow)
                }%)`,
              }}
            >
              {popularBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex-shrink-0 w-full md:w-1/3 px-2"
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-10 shadow-md"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-10 shadow-md"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSlider;
