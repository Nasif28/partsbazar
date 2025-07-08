import Link from "next/link";
import Image from "next/image";

const PopularBlogs = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      })
      .toUpperCase();
  };

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="flex group hover:bg-secondary p-2 rounded-md transition"
    >
      <div className="relative w-28 h-16 flex-shrink-0 mr-4">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          className="object-cover rounded-sm"
          sizes="64px"
        />
      </div>

      <div>
        <div className="text-xs text-textLight">{formatDate(blog.date)}</div>
        <h4 className="font-medium group-hover:text-primary transition-colors">
          {blog.title}
        </h4>
      </div>
    </Link>
  );
};

export default PopularBlogs;
