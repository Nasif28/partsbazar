// src/components/Blogs/BlogDetails.jsx
"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PopularBlogs from "./PopularBlogs";
import {
  fetchAllBlogs,
  fetchBlogBySlug,
  fetchPopularBlogs,
} from "@/redux/features/blogSlice";

const BlogDetails = ({ slug }) => {
  //   const { slug } = params;
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentBlog, popularBlogs, allBlogs, loading } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    // Fetch all blogs first to ensure we have them for navigation
    dispatch(fetchAllBlogs()).then(() => {
      // Then fetch the specific blog
      dispatch(fetchBlogBySlug(slug));
    });
    dispatch(fetchPopularBlogs());
  }, [slug, dispatch]);

  // Find current index for next/prev navigation
  const currentIndex = allBlogs.findIndex((blog) => blog.slug === slug);
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-200 h-10 w-3/4 mb-8 rounded animate-pulse" />
            <div className="bg-gray-200 h-96 mb-8 rounded animate-pulse" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 h-4 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentBlog && !loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <p>The blog you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => router.push("/blogs")}>
            View All Blogs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Blog Image */}
              <div className="relative h-96">
                <img
                  src={currentBlog.thumbnail}
                  alt={currentBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {currentBlog.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentBlog.readingTime}
                  </span>
                </div>

                <h1 className="text-3xl font-bold mb-4">{currentBlog.title}</h1>

                <div className="flex items-center mb-6">
                  <span className="text-gray-700">By {currentBlog.author}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-500">
                    {format(new Date(currentBlog.date), "MMMM dd, yyyy")}
                  </span>
                </div>

                {/* Blog Content */}
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentBlog.content }}
                />
              </div>
            </article>

            {/* Next/Prev Navigation */}
            <div className="mt-8 flex justify-between">
              {prevBlog ? (
                <Link
                  href={`/blogs/${prevBlog.slug}`}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  <div className="text-left">
                    <span className="text-sm block">Previous</span>
                    <span className="font-medium">{prevBlog.title}</span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextBlog ? (
                <Link
                  href={`/blogs/${nextBlog.slug}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 ml-auto"
                >
                  <div className="text-right">
                    <span className="text-sm block">Next</span>
                    <span className="font-medium">{nextBlog.title}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {popularBlogs.map((blog) => (
                  <PopularBlogs key={blog.id} blog={blog} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-600 mb-4">
                Register now to get latest updates on promotions & coupons.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
