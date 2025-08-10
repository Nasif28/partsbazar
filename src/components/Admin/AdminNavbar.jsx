"use client";
import {
  Home,
  Maximize,
  Minimize,
  Moon,
  Sun,
  Menu,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Breadcrumbs from "../Global/Breadcrumbs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import Link from "next/link";

export default function AdminNavbar() {
  const { theme, setTheme } = useTheme();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <header className="border-b bg-sidebar">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />

          <Breadcrumbs textColor="text-muted-foreground" />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="/" target="_blank">
              <Home className="w-5 h-5" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize className="w-5 h-5" />
            ) : (
              <Maximize className="w-5 h-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="rounded-lg h-10 w-10 cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>NZ</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href="/admin/profile"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>

              {/* <DropdownMenuItem asChild>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem> */}

              <DropdownMenuItem asChild>
                <Link
                  href="/admin/logout"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
