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
    <section className=" bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Today's Deal</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft size={20} />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  24% OFF
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold mb-2">{deal.name}</h3>

                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(deal.rating) ? "#F59E0B" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({deal.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-red-600">
                      ${deal.discountedPrice.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      ${deal.originalPrice.toFixed(2)}
                    </div>
                  </div>
                  <Button className="bg-blue-700 hover:bg-blue-800">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TodaysDeals;
