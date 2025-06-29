import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const TopBar = () => {
  return (
    <div className="bg-gray-100 text-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                <span>English</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Bangla</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Currency Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <span>BDT</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>BDT</DropdownMenuItem>
              <DropdownMenuItem>USD</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/track-order" className="hover:text-primary">
            Track Order
          </Link>
          <Link href="/support" className="hover:text-primary">
            Support
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact Us
          </Link>
          <Link href="/about" className="hover:text-primary">
            About Us
          </Link>
          <Link href="/faq" className="hover:text-primary">
            FAQs
          </Link>
          <Link href="/helpline" className="hover:text-primary">
            Helpline
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
