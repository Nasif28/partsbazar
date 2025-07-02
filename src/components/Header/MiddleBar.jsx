"use client";
import Link from "next/link";
import Image from "next/image";
import { BarChart2, Sun, Moon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import SearchBar from "./SearchBar";
import CartDropdown from "./CartDropdown";
import UserAuth from "./UserAuth";
import logo from "./../../assets/logo.png";
import { useState } from "react";

const MiddleBar = () => {
  const { theme, setTheme } = useTheme();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  return (
    <header className="bg-background">
      <div className="myContainer">
        <div className="container py-1 mx-auto">
          {/* Mobile Search */}
          {mobileSearchOpen && (
            <div className="sm:hidden absolute top-full left-0 right-0 px-5 bg-background z-50 ">
              <SearchBar
                isMobileOpen={mobileSearchOpen}
                onClose={() => setMobileSearchOpen(false)}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" aria-label="Parts Bazar Home">
                <Image
                  src={logo}
                  alt="Parts Bazar Logo"
                  width={80}
                  height={80}
                />
              </Link>
            </div>

            <div className="hidden sm:flex relative flex-1 max-w-2xl mx-4">
              <SearchBar />
            </div>

            <div className="flex items-center gap-0 sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center sm:hidden h-auto py-2 px-1 sm:px-2 gap-0.5"
                onClick={toggleMobileSearch}
                aria-label="Search"
              >
                {mobileSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span className="text-xs">Search</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center h-auto py-2 px-1 sm:px-2 gap-0.5"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun /> : <Moon />}
                <span className="text-xs">Theme</span>
              </Button>

              <Link href="/compare">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex flex-col items-center h-auto py-2 px-1 sm:px-2 gap-0.5"
                  aria-label="Compare products"
                >
                  <BarChart2 className="h-6 w-6" />
                  <span className="text-xs">Compare</span>
                </Button>
              </Link>

              <CartDropdown />
              <UserAuth />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MiddleBar;
