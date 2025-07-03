"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronDown, X, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CategoriesMenu from "../Home/Hero/CategoriesMenu";
import CategorySidebar from "../Home/Hero/CategoriesMenu";
import clsx from "clsx";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Gift Cards", href: "/gift-cards" },
    { name: "Complete Service Package", href: "/service-package" },
    { name: "Combo Packages", href: "/combo-packages" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="bg-primary">
        <div className="myContainer">
          <div className="container mx-auto">
            <div className="flex items-center relative">
              {/* Categories Dropdown */}
              {/* <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="justify-between hover:bg-primary-dark cursor-pointer rounded-none bg-primary-dark flex items-center py-6 w-3xs">
                      <div className="flex items-center">
                        <LayoutGrid className="h-5 w-5 mr-2" />
                        <span>Categories</span>
                      </div>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>

                  <CategoriesMenu
                    variant="dropdown"
                    onSelect={() => setMobileMenuOpen(false)}
                  />
                </DropdownMenu>
              </div> */}

              <nav className="bg-white border-b shadow px-6 py-4 flex justify-between items-center">
                <div>
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Categories
                  </button>
                </div>
                {/* Other navbar items */}
              </nav>

              {/* Category Sidebar Dropdown */}
              <div
                className={clsx(
                  "absolute left-0 w-64 z-30 bg-white shadow-lg border-r transition-all duration-300",
                  isCategoryOpen ? "top-14" : "-top-264"
                )}
              >
                <CategorySidebar />
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden mr-3">
                <Button
                  variant="ghost"
                  className="text-white"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="hidden lg:flex space-x-1 ml-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="px-4 py-3 hover:bg-primary-dark transition-colors rounded text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform duration-300 lg:hidden ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4">
            <h3 className="font-bold mb-2">Categories</h3>
            <CategoriesMenu
              variant="sidebar"
              onSelect={() => setMobileMenuOpen(false)}
            />
          </div>

          <div className="p-4 border-t">
            <h3 className="font-bold mb-2">Navigation</h3>
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block py-2 px-4 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
