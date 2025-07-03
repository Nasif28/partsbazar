// components/Features.tsx
import { Truck, ShieldCheck, Clock, Headphones } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Original products",
      description: "Only parts from trusted brands",
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Fast Delivery",
      description: "All Over Bangladesh",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "7 Days Returns",
      description: "Easy return/replacement",
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: "24/7 Support",
      description: "We are Dedicated 24/7 Support Team",
    },
  ];

  return (
    <div className="bg-secondary py-8">
      <div className="myContainer">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:divide-x-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex items-center h-full">{feature.icon}</div>

                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-textLight">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
