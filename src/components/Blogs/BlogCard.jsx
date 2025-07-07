import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    return (
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{day}</span>
        <span className="text-sm">{month}</span>
      </div>
    );
  };

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-60">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white text-gray-800 rounded-md w-14 h-14 flex items-center justify-center shadow-lg">
          {formatDate(blog.date)}
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t rounded-b-lg from-black to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
        <p className="text-sm">{blog.excerpt}</p>
      </div>

      {/* Always visible title on mobile */}
      <div className="p-4 bg-white md:hidden">
        <h3 className="font-bold text-gray-800">{blog.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{blog.excerpt}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
