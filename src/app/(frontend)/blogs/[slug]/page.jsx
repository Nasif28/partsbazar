import BlogDetails from "@/components/Blogs/BlogDetails";
import { Suspense } from "react";
import Loading from "@/app/loading";

const BlogDetailsPage = ({ params }) => {
  return (
    <Suspense fallback={<Loading />}>
      <BlogDetails slug={params.slug} />
    </Suspense>
  );
};

export default BlogDetailsPage;
