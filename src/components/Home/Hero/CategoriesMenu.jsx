"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  {
    id: 1,
    name: "Car Parts & Accessories",
    slug: "car-parts-accessories",
    subcategories: [
      { id: 101, name: "Engine Parts", slug: "engine-parts" },
      { id: 102, name: "Brakes", slug: "brakes" },
      { id: 103, name: "Suspension", slug: "suspension" },
    ],
  },
  {
    id: 2,
    name: "Bike Parts & Accessories",
    slug: "bike-parts-accessories",
    subcategories: [
      { id: 201, name: "Handlebars", slug: "handlebars" },
      { id: 202, name: "Seats", slug: "seats" },
    ],
  },
  {
    id: 3,
    name: "Electrical & Electronics",
    slug: "electrical-electronics",
    subcategories: [
      { id: 301, name: "Batteries", slug: "batteries" },
      { id: 302, name: "Wiring", slug: "wiring" },
      { id: 303, name: "Lighting", slug: "lighting" },
    ],
  },
  {
    id: 4,
    name: "Industrial Equipment & Components",
    slug: "industrial-equipment-components",
  },
  {
    id: 5,
    name: "Heavy Vehicle",
    slug: "heavy-vehicle",
    subcategories: [
      { id: 501, name: "Truck Parts", slug: "truck-parts" },
      { id: 502, name: "Bus Parts", slug: "bus-parts" },
    ],
  },
  {
    id: 6,
    name: "Hybrid Car Battery",
    slug: "hybrid-car-battery",
  },
  {
    id: 7,
    name: "Tools & Hardware",
    slug: "tools-hardware",
    subcategories: [
      { id: 701, name: "Hand Tools", slug: "hand-tools" },
      { id: 702, name: "Power Tools", slug: "power-tools" },
    ],
  },
  {
    id: 8,
    name: "Electronics Devices & Accessories",
    slug: "electronics-devices-accessories",
  },
  {
    id: 9,
    name: "Health & Medicine",
    slug: "health-medicine",
  },
  {
    id: 10,
    name: "Agriculture & Food",
    slug: "agriculture-food",
  },
  {
    id: 11,
    name: "Agricultural Machinery",
    slug: "agricultural-machinery",
  },
  {
    id: 12,
    name: "Wholesale Products",
    slug: "wholesale-products",
  },
];

const CategoriesMenu = ({ variant = "dropdown", onSelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  const renderCategoryItem = (category, isSub = false) => {
    const hasSubcategories =
      category.subcategories && category.subcategories.length > 0;
    const isActive = activeCategory === category.id;

    if (variant === "dropdown") {
      if (hasSubcategories) {
        return (
          <DropdownMenuSub key={category.id}>
            <DropdownMenuSubTrigger className="hover:bg-gray-100 px-3 py-2 cursor-pointer text-left w-full">
              {category.name}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="p-0 overflow-hidden rounded-none max-h-[60vh] overflow-y-auto"
              align="start"
              sideOffset={0}
            >
              {category.subcategories.map((sub) => (
                <DropdownMenuItem key={sub.id} asChild>
                  <Link
                    href={`/products?subcategory=${sub.slug}`}
                    className="block w-full px-2 py-1"
                    onClick={onSelect}
                  >
                    {sub.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }
      return (
        <DropdownMenuItem key={category.id} asChild>
          <Link
            href={`/products?category=${category.slug}`}
            className="block w-full px-3 py-2"
            onClick={onSelect}
          >
            {category.name}
          </Link>
        </DropdownMenuItem>
      );
    }

    // Sidebar variant rendering
    return (
      <div
        key={category.id}
        className="relative group border-b border-gray-100"
        onMouseEnter={() => handleCategoryHover(category.id)}
        onMouseLeave={handleCategoryLeave}
      >
        <Link
          href={`/products?category=${category.slug}`}
          className="block px-4 py-3 hover:bg-gray-50 hover:text-primary"
        >
          <div className="flex justify-between items-center">
            <span>{category.name}</span>
            {hasSubcategories && (
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </div>
        </Link>

        {hasSubcategories && isActive && (
          <div className="absolute left-full top-0 w-64 bg-white border border-gray-100 shadow-md rounded-md z-50">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/products?subcategory=${sub.slug}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (variant === "dropdown") {
    return (
      <DropdownMenuContent
        className="p-0 overflow-hidden rounded-none w-3xs max-h-[60vh] overflow-y-auto"
        align="start"
        sideOffset={0}
      >
        {categories.map(renderCategoryItem)}
      </DropdownMenuContent>
    );
  }

  // Sidebar variant
  return (
    <div className="w-3xs bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="max-h-[60vh] overflow-y-auto">
        {categories.map(renderCategoryItem)}
      </div>
    </div>
  );
};

export default CategoriesMenu;
