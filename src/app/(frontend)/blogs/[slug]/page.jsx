import BlogDetails from "@/components/Blogs/BlogDetails";
import React from "react";

const BlogDetailsPage = ({ params }) => {
  return (
    <div>
      <BlogDetails slug={params.slug} />
    </div>
  );
};

export default BlogDetailsPage;
