import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TodaysDeals from "./TodaysDeals";
import CategoriesGrid from "./CategoriesGrid";
const HeroBanner = () => {
  const categories = [
    "Car Parts & Accessories",
    "Bike Parts & Accessories",
    "Electrical & Electronics",
    "Industrial Equipment & Co...",
    "Heavy Vehicle",
    "Hybrid Car Battery",
    "Tools & Hardware",
    "Electronics Devices & Acce...",
    "Health & Medicine",
    "Agriculture & Food",
    "Agricultural Machinery",
    "Wholesale Products",
  ];
  const deals = [
    { originalPrice: 1100.0, discountedPrice: 1147.7 },
    { originalPrice: 6300.0, discountedPrice: 6510.0 },
    { originalPrice: 14175.0, discountedPrice: 15750.0 },
  ];
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="w-full md:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-primary text-white p-4">
            <h3 className="font-bold">Categories</h3>
          </div>
          <ul className="divide-y">
            {categories.map((category, index) => (
              <li
                key={index}
                className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              >
                <span>{category}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </li>
            ))}
          </ul>
          <div className="p-4">
            <Link href="/categories">
              <Button variant="outline" className="w-full">
                View All
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel and Today's Deal */}
        <div className="w-full md:w-3/4 flex flex-col md:flex-row gap-6">
          {/* Carousel (Placeholder) */}
          <div className="flex flex-col bg-white shadow-lg rounded-lg p-4">
            <div className="w-full bg-gray-200 border-2 border-dashed rounded-xl h-80 flex items-center justify-center">
            Carousel Banner
          </div>
          <div>
            <CategoriesGrid />
          </div>
          </div>

          {/* Today's Deal */}
          {/* <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Today's Deal</h3>
              <Link href="/today-deals" className="text-primary text-sm">
                See All
              </Link>
            </div>
            <div className="space-y-4">
              {deals.map((deal, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="text-sm text-gray-500 line-through">
                    ${deal.originalPrice.toFixed(2)}
                  </div>
                  <div className="text-lg font-bold text-primary">
                    ${deal.discountedPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <TodaysDeals />
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
