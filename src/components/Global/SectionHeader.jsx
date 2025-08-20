import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SectionHeader = ({
  title,
  href,
  linkText = "View All",
  className = "",
}) => {
  return (
    <div className={`flex items-center mb-8 gap-2 ${className}`}>
      <h2 className="text-xl sm:text-2xl font-bold whitespace-nowrap">
        {title}
      </h2>
      <div className="w-full border-t border-primary mx-4"></div>
      <Link
        href={href}
        className="bg-primary hover:bg-primary-dark rounded-3xl px-3 py-1.5 text-white text-xs font-bold flex items-center gap-1 whitespace-nowrap"
      >
        {linkText}
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default SectionHeader;
