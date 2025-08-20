"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronDown, X, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoriesMenu from "../Home/Hero/CategoriesMenu";
import clsx from "clsx";
import Image from "next/image";
import { PBLogo } from "@/assets/Import";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blogs" },
    { name: "Videos", href: "/videos" },
    { name: "Request Parts", href: "/request_parts" },
    { name: "Dashboard", href: "/user/dashboard" },
    { name: "Admin", href: "/admin" },
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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="text-white">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="left" className="p-0 w-72 bg-card">
                    <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src={PBLogo}
                          alt="Parts Bazar Logo"
                          width={60}
                          height={60}
                        />
                        <SheetTitle className="ml-2">Parts Bazar</SheetTitle>
                      </div>
                    </SheetHeader>

                    {/* Navigation */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Navigation
                      </h3>

                      <div className="space-y-2">
                        {navLinks.map((link, index) => (
                          <Link
                            key={index}
                            href={link.href}
                            className="block py-2 px-3 hover:bg-primary/10  border-b hover:text-primary"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Navigation */}
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
      </nav>
    </>
  );
};

export default Navbar;
