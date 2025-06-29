import Link from "next/link";
import { Search, Heart, ShoppingCart, User, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const MainHeader = () => {
  // For demo purposes, we'll use static cart count and user status
  const isLoggedIn = false;
  const cartItems = 0;
  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div>
            <Link href="/" className="text-2xl font-bold text-primary">
              Partschai
            </Link>
          </div>
          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl mx-4">
            <Input
              type="text"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-2 rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="flex flex-col items-center">
              <BarChart2 className="h-6 w-6" />
              <span className="text-xs">Compare</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center">
              <Heart className="h-6 w-6" />
              <span className="text-xs">Wishlist</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center relative"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xs">Cart</span>
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center"
                  >
                    <User className="h-6 w-6" />
                    <span className="text-xs">User</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="flex flex-col items-center">
                  <User className="h-6 w-6" />
                  <span className="text-xs">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default MainHeader;
