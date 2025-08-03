"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingCart,
  Heart,
  Lock,
  LogOut,
  CircleDollarSign,
  ShoppingBag,
  BarChart2,
  Star,
  UserPen,
  MapPinPlus,
  Trash,
  MessageSquareCode,
  Gift,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  { title: "My Orders", url: "/user/orders", icon: ShoppingBag },
  { title: "Transactions", url: "/user/transactions", icon: CircleDollarSign },
  { title: "Cart", url: "/user/cart", icon: ShoppingCart },
  { title: "Reward Points", url: "/user/reward", icon: Gift },
  { title: "My Wishlist", url: "/user/wishlist", icon: Heart },
  { title: "Compare", url: "/user/compare", icon: BarChart2 },
  { title: "My Reviews", url: "/user/reviews", icon: Star },
  {
    title: "My Testimonials",
    url: "/user/testimonials",
    icon: MessageSquareCode,
  },
  { title: "Manage Profile", url: "/user/profile", icon: UserPen },
  { title: "My Address", url: "/user/address", icon: MapPinPlus },
  { title: "Change Password", url: "/user/change-password", icon: Lock },
  { title: "Delete Account", url: "/user/delete-account", icon: Trash },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="relative h-full">
      <SidebarHeader className="flex items-center">
        <Avatar className="rounded-lg h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>NZ</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center group-data-[collapsible=icon]:hidden">
          <span> Nasif Jihan</span>
          <span className="text-muted-foreground text-xs">
            nasif@example.com
          </span>
        </div>
      </SidebarHeader>

      <Separator className="my-2" />

      <SidebarContent>
        <SidebarMenu className="flex flex-col">
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  key={item.url}
                  href={item.url}
                  className={cn`justify-start font-semibold group-data-[collapsible=icon]:mx-2 px-4 py-5 rounded-none hover:bg-primary/10 ${pathname === item.url ? "bg-primary/10 text-primary" : "hover:bg-primary/10"}`}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <Separator className="my-2" />

      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Button className="w-full py-5 cursor-pointer" size="lg">
            <LogOut />
            <span className="group-data-[collapsible=icon]:hidden">
              Sign Out
            </span>
          </Button>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
