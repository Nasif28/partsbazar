"use client";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
// import { useSession } from "next-auth/react";

const UserAuth = () => {
  const isLoggedIn = false;
  const userImage = "/placeholder-user.jpg";

  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center h-auto py-2 px-1 sm:px-2 gap-0.5"
              aria-label="User menu"
            >
              {userImage ? (
                <Image
                  src={userImage}
                  alt="User profile"
                  width={24}
                  height={24}
                  className="rounded-full h-6 w-6 object-cover"
                />
              ) : (
                <User className="h-6 w-6" />
              )}
              <span className="text-xs">Account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center h-auto py-2 px-1 sm:px-2 gap-0.5"
            aria-label="Login"
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Login</span>
          </Button>
        </Link>
      )}
    </>
  );
};

export default UserAuth;
