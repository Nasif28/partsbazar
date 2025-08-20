import Link from "next/link";
import Image from "next/image";

const BrandCard = ({ brand }) => {
  return (
    <Link
      href={`/products?brand=${encodeURIComponent(brand.bname)}`}
      className="group flex flex-col items-center justify-center p-2 md:p-4 bg-background rounded-lg shadow-sm border border-sidebar-border hover:shadow-md hover:border-primary transition-all duration-300"
    >
      <div className="relative w-24 h-24 mb-1 sm:mb-3 flex items-center justify-center">
        {brand.logo ? (
          <Image
            src={brand.logo}
            alt={brand.bname}
            fill
            className="object-contain sm:p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-background border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
            <span className="hover:text-primary text-lg font-bold">
              {brand.bname.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-bold text-center group-hover:text-primary transition-colors">
        {brand.bname}
      </h3>
    </Link>
  );
};

export default BrandCard;
