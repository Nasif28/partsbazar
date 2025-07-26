import Link from "next/link";
import Image from "next/image";

const CategoryCard = ({ category, isSubcategory = false }) => {
  return (
    <Link
      href={
        isSubcategory
          ? `/products?subcategory=${encodeURIComponent(category.slug)}`
          : `/products?category=${encodeURIComponent(category.slug)}`
      }
      className="bg-card rounded-lg shadow-sm border border-border overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary group"
    >
      <div className="relative h-40">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-muted w-full h-full flex items-center justify-center">
            <span className="text-foreground text-2xl font-bold group-hover:text-primary">
              {category.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
            {category.name}
          </h3>

          {isSubcategory && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              Subcategory
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {category.description}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
