import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const CategoriesGrid = () => {
  const categories = [
    { name: "Brakes", count: 42 },
    { name: "Filters", count: 28 },
    { name: "Lubricants", count: 35 },
    { name: "Engine Parts", count: 56 },
    { name: "Lighting", count: 24 },
    { name: "Air Fresheners", count: 18 },
    { name: "Suspension", count: 31 },
    { name: "Exhaust Systems", count: 22 },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Button variant="outline">
            View All <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="bg-gray-50 rounded-lg p-4 flex flex-col items-center hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-3" />
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} items</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategoriesGrid;
