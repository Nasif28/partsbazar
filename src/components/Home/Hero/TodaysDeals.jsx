import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { Button } from "../../ui/button";
import Image from "next/image";

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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-2 overflow-y-auto max-h-[472px]">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="bg-card flex rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <div className="bg-card w-36 h-28">
                  <Image
                    src="/authbg.jpg"
                    alt="Product Image"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-sm text-[10px] font-bold">
                  24% OFF
                </div>
              </div>

              <div className="p-2">
                <h3 className="font-bold pb-1">{deal.name}</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-md font-bold text-primary">
                      ${deal.discountedPrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground line-through">
                      ${deal.originalPrice.toFixed(2)}
                    </div>
                  </div>

                  <Button size="icon">
                    <ShoppingCart />
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
