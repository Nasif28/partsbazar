"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

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

export default function CategoriesMenu() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative bg-background z-20 w-3xs">
      <ul className="border divide-y">
        {categories.map((category, index) => (
          <li
            key={category.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative group hover:bg-muted cursor-pointer flex justify-between items-center"
          >
            <Link
              href={`/product/category=${category.slug}`}
              className="flex-1 px-4 py-2 group-hover:text-primary"
            >
              {category.name}
            </Link>

            {category.subcategories && (
              <ChevronRight className="w-4 h-4 mr-2 group-hover:text-primary" />
            )}

            {/* Submenu */}
            {category.subcategories && hoveredIndex === index && (
              <ul className="absolute left-full top-0 bg-background border divide-y w-48 z-20">
                {category.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/product/subcategory=${sub.slug}`}
                      className="block px-4 py-2 hover:bg-muted hover:text-primary transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Sticky View All Button */}
      {/* <div className="sticky bottom-0 bg-white border-t p-4">
        <Link
          href="/product/all"
          className="block w-full text-center bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
        >
          View All
        </Link>
      </div> */}
    </div>
  );
}
