import BlogDetails from "@/components/Blogs/BlogDetails";
import React from "react";

const BlogDetailsPage = ({ params }) => {
  return (
    <div>
      <BlogDetails params={params} />
    </div>
  );
};

export default BlogDetailsPage;
