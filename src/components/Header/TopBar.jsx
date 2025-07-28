"use client";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 text-sm topBar">
      <div className="myContainer">
        <div className="container mx-auto flex items-center justify-between py-1">
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <CurrencySwitcher />
          </div>

          {/* Responsive Links */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link href="/track" className="hover:text-primary">
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
            <Link href="/faqs" className="hover:text-primary">
              FAQs
            </Link>
            <Link href="/helpline" className="hover:text-primary">
              Helpline
            </Link>
          </div>

          {/* Mobile Dropdown */}
          <div className="sm:hidden">
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/track-order">Track Order</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/support">Support</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">Contact Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/faq">FAQs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/helpline">Helpline</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
