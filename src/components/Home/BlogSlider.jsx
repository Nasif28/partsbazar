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
import SectionSlider from "../Global/SectionSlider";

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

          <SectionSlider
            items={popularBlogs}
            loading={loading}
            itemClassName="xl:basis-1/3 sm:basis-1/2"
            renderItem={(blog) => <BlogCard blog={blog} />}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
