import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "../../ui/button";

const TodaysDeals = () => {
  const deals = [
    {
      name: "Performance Brake Kit",
      originalPrice: 1100.0,
      discountedPrice: 1147.7,
      rating: 4.5,
      reviews: 42,
    },
    {
      name: "Premium Air Filter Set",
      originalPrice: 6300.0,
      discountedPrice: 6510.0,
      rating: 4.2,
      reviews: 28,
    },
    {
      name: "Complete Engine Tune-Up Kit",
      originalPrice: 14175.0,
      discountedPrice: 15750.0,
      rating: 4.8,
      reviews: 56,
    },
    {
      name: "LED Headlight Conversion Kit",
      originalPrice: 8500.0,
      discountedPrice: 7650.0,
      rating: 4.6,
      reviews: 37,
    },
  ];

  return (
    <section className="bg-secondary rounded-xl p-2">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-1 pb-2">
          <h2 className="text-xl font-bold text-center w-full">Today's Deal</h2>
          {/* <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft size={20} />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight size={20} />
            </Button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-2">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="bg-white flex rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed w-36 h-28" />
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-sm text-[10px] font-bold">
                  24% OFF
                </div>
              </div>

              <div className="p-2">
                <h3 className="font-bold pb-1">{deal.name}</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-md font-bold text-red-600">
                      ${deal.discountedPrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 line-through">
                      ${deal.originalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* <Button className="bg-blue-700 hover:bg-blue-800">
                  Add to Cart
                </Button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TodaysDeals;
