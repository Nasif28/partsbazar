"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ textColor = "text-white" }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Generate breadcrumb items
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        href,
        label: segment
          .split(/[_-]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      };
    }),
  ];

  return (
    <nav className="flex mx-auto items-center" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.href}>
            <li>
              <div className="flex items-center">
                {index > 0 && (
                  <ChevronRight className={`h-4 w-4 ${textColor}`} />
                )}
                {index < breadcrumbItems.length - 1 ? (
                  <Link
                    href={item.href}
                    className={`ml-2 text-sm font-medium transition-colors ${textColor}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`ml-2 text-sm font-bold underline-offset-2 ${textColor}`}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
