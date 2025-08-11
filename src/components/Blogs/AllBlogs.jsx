"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "@/components/Blogs/BlogCard";
import { fetchAllBlogs } from "@/redux/features/blogSlice";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const { allBlogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  return (
    <div className="min-h-screen py-10">
      <div className="myContainer">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-background rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="bg-card h-60" />
                  <div className="p-4">
                    <div className="h-6 bg-card rounded w-3/4 mb-2" />
                    <div className="h-4 bg-card rounded w-full mb-1" />
                    <div className="h-4 bg-card rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
