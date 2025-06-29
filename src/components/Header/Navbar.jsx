import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Navbar = () => {
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
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Gift Cards", href: "/gift-cards" },
    { name: "Complete Service Package", href: "/service-package" },
    { name: "Combo Packages", href: "/combo-packages" },
  ];
  return (
   <nav className="bg-primary text-white sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          {/* Categories Dropdown (for larger screens) */}
          <div className="relative group hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary-dark hover:bg-primary-darker flex items-center px-6 py-3">
                  <Menu className="h-5 w-5 mr-2" />
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
                {categories.map((category, index) => (
                  <DropdownMenuItem key={index}>
                    <Link
                      href={`/category/${category
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 ml-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="py-3 hover:bg-primary-dark px-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
          {/* For mobile: a simple menu button (we'll implement mobile menu later) */}
          <div className="md:hidden ml-auto">
            <Button variant="ghost">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
