import AllBlogs from "@/components/Blogs/AllBlogs";
import PageHeader from "@/components/Global/PageHeader";
import React from "react";

const BlogsPage = () => {
  return (
    <div>
      <PageHeader
        title="All Blogs"
        description="  Explore our collection of automotive tips, guides, and insights to
          keep your vehicle in top condition."
      />

      <AllBlogs />
    </div>
  );
};

export default BlogsPage;
