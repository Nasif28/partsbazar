"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const mockCartItems = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    quantity: 1,
    image: "/placeholder-product.jpg",
  },
  {
    id: 2,
    name: "Mouse",
    price: 29.99,
    quantity: 2,
    image: "/placeholder-product.jpg",
  },
];

const CartDropdown = () => {
  const cartItemsCount = mockCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center h-auto py-2 px-1 sm:px-2 gap-0.5 relative"
          aria-label="Cart"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="text-xs">Cart</span>
          {cartItemsCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        {mockCartItems.length > 0 ? (
          <>
            <div className="max-h-60 overflow-y-auto">
              {mockCartItems.map((item) => (
                <DropdownMenuItem key={item.id} className="flex gap-3 p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <div className="p-2 border-t">
              <Link href="/user/cart">
                <Button className="w-full">View Cart</Button>
              </Link>
            </div>
          </>
        ) : (
          <DropdownMenuItem className="text-center p-4">
            Your cart is empty
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartDropdown;
