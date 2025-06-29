import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            CarParts
          </Link>
          <nav className="ml-10 hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/campaign">Campaigns</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search parts..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button variant="ghost">
            <ShoppingCart className="h-6 w-6" />
            <span className="ml-1">Cart (0)</span>
          </Button>

          <Button>
            <User className="h-5 w-5 mr-2" />
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
