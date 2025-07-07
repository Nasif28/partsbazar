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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const BlogDetails = ({ slug }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentBlog, popularBlogs, allBlogs, loading } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchAllBlogs()).then(() => {
      dispatch(fetchBlogBySlug(slug));
    });
    dispatch(fetchPopularBlogs());
  }, [slug, dispatch]);

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
    <div className="min-h-screen py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <article className="rounded-lg shadow-md overflow-hidden">
              {/* Category */}
              <span className="text-xs uppercase bg-red-100 text-red-600 px-2 py-1 rounded mb-4 inline-block">
                {currentBlog.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl font-bold mb-2">{currentBlog.title}</h1>

              {/* Meta Info */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://ui-avatars.com/api/?name=Vosure+Yoshda" />
                  <AvatarFallback>VY</AvatarFallback>
                </Avatar>
                <span>By {currentBlog.author}</span>
                <span>•</span>
                <span>{currentBlog.date}</span>
                <span>•</span>
                <span>{currentBlog.readingTime}</span>
              </div>

              {/* Thumbnail */}
              <div className="rounded overflow-hidden mb-8">
                <Image
                  src={currentBlog.thumbnail}
                  alt={currentBlog.title}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-md"
                />
              </div>

              <article
                className="prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
              />

              <Separator className="my-10" />

              {/* Share Buttons */}
              <div className="flex space-x-4 items-center mb-10">
                <span className="text-sm font-medium">Share:</span>
                <Button size="icon" variant="outline">
                  <i className="fab fa-facebook-f" />
                </Button>
                <Button size="icon" variant="outline">
                  <i className="fab fa-twitter" />
                </Button>
                <Button size="icon" variant="outline">
                  <i className="fab fa-linkedin-in" />
                </Button>
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

            {/* Comments */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Leave a Reply</h2>
              <form className="space-y-4">
                <Textarea placeholder="Comment" required />
                <Button type="submit">Post Comment</Button>
              </form>
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
