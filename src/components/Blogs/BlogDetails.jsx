"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, LayoutGrid, Menu } from "lucide-react";
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
import BlogShare from "./BlogShare";
import { Label } from "../ui/label";
import { BlogComment } from "./BlogComment";

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
      <div className="myContainer">
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
      </div>
    );
  }

  if (!currentBlog && !loading) {
    return (
      <div className="myContainer">
        <div className="min-h-screen py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
            <p>The blog you're looking for doesn't exist.</p>
            <Button className="mt-4" onClick={() => router.push("/blogs")}>
              View All Blogs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="myContainer">
      <div className="min-h-screen py-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <article className="overflow-hidden">
                {/* Category */}
                <span className="text-xs uppercase bg-primary text-white px-3 py-1 rounded-sm mb-4 inline-block">
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

                {/* <Separator className="my-10" /> */}

                {/* Share Buttons */}
                <div className="mt-10">
                  <BlogShare blog={currentBlog} />
                </div>
              </article>

              <Separator className="mb-10" />

              {/* Next/Prev Navigation */}
              <div className="flex items-center justify-between w-full">
                {prevBlog ? (
                  <Link
                    href={`/blogs/${prevBlog.slug}`}
                    className="flex items-center text-muted-foreground hover:text-primary flex-1"
                  >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    <div className="text-left max-w-[200px] truncate">
                      <span className="font-medium">{prevBlog.title}</span>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                <div className="flex-1 flex justify-center">
                  <Link href="/blogs" className="p-2">
                    <LayoutGrid className="w-6 h-6 text-muted-foreground hover:text-foreground" />
                  </Link>
                </div>

                {nextBlog ? (
                  <Link
                    href={`/blogs/${nextBlog.slug}`}
                    className="flex items-center text-muted-foreground hover:text-primary flex-1 justify-end"
                  >
                    <div className="text-right max-w-[200px] truncate">
                      <span className="font-medium">{nextBlog.title}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>

              <Separator className="my-10" />

              {/* Comments */}
              <div>
                <BlogComment />
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
    </div>
  );
};

export default BlogDetails;
