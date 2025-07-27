import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarGroup = ({ testimonials, maxDisplay = 4 }) => {
  // Filter testimonials that have an image
  const avatars = testimonials.filter((t) => t.image).slice(0, maxDisplay);
  const extraCount = testimonials.length - maxDisplay;

  return (
    <div className="flex items-center justify-center lg:justify-start">
      <div className="flex -space-x-4">
        {avatars.map((testimonial, index) => (
          <Avatar key={index} className="w-12 h-12">
            <AvatarImage src={testimonial.image} alt={testimonial.author} />
            <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}

        {extraCount > 0 && (
          <Avatar className="w-12 h-12">
            <AvatarFallback className="text-primary font-bold">
              +{extraCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default AvatarGroup;
