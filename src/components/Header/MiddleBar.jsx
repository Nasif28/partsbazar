"use client";
import Link from "next/link";
import Image from "next/image";
import { BarChart2, Sun, Moon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import SearchBar from "./SearchBar";
import CartDropdown from "./CartDropdown";
import UserAuth from "./UserAuth";
import logo from "./../../assets/logo.png";

const MiddleBar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="myContainer">
      <div className="container py-1 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="Parts Bazar Home">
              <Image src={logo} alt="Parts Bazar Logo" width={80} height={80} />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative flex-1 max-w-2xl mx-4">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
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

            {/* Compare */}
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
    </header>
  );
};

export default MiddleBar;
