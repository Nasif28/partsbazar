"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronDown, X, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoriesMenu from "../Home/Hero/CategoriesMenu";
import clsx from "clsx";
import Image from "next/image";
import logo from "./../../assets/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
              <Button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="justify-between hover:bg-primary-dark cursor-pointer rounded-none bg-primary-dark flex items-center py-6 w-3xs"
              >
                <div className="flex items-center">
                  <LayoutGrid className="h-5 w-5 mr-2" />
                  <span className="text-[16px]">Categories</span>
                </div>
                <ChevronDown
                  className={clsx(
                    "h-4 w-4 ml-2 transform transition-transform duration-300",
                    isCategoryOpen && "rotate-180"
                  )}
                />
              </Button>

              {/* Category Sidebar Dropdown */}
              <div
                className={clsx(
                  "absolute left-0 w-64 z-30  border-r transition-all duration-300",
                  isCategoryOpen ? "top-12" : "-top-264"
                )}
              >
                <CategoriesMenu />
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden ml-auto">
                <Button
                  variant="ghost"
                  className="text-white"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          className={`fixed inset-y-0 left-0 w-68 bg-background z-50 transform transition-transform duration-300 lg:hidden ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Image src={logo} alt="Parts Bazar Logo" width={80} height={80} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 border-t">
            <h3 className="font-bold mb-2">Navigation</h3>
            <div className="space-y-2">
              <Link
                // key={index}
                href="/categories"
                className="block py-2 px-4 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>

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
