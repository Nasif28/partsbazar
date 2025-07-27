import Image from "next/image";
import { Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-lg p-6 h-full flex flex-col border border-white/30">
      <div className="flex items-start mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-white">
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-2xl font-bold">
                {testimonial.author.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">
            {testimonial.author}
          </h3>
          <p className="text-gray-200 text-sm">{testimonial.role}</p>
          {testimonial.company && (
            <p className="text-gray-300 text-xs">{testimonial.company}</p>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>

      {/* Content with scrollable area */}
      <div className="overflow-y-auto max-h-40 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100/20 mb-2">
        <p className="text-gray-100 italic">{testimonial.content}</p>
      </div>

      {/* Meta info */}
      <div className="mt-auto pt-2 border-t border-white/30 flex justify-between text-sm text-gray-300">
        <span>{testimonial.date}</span>
        <span>{testimonial.location}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
