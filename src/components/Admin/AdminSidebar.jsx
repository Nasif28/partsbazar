"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboardIcon,
  PackageIcon,
  UsersIcon,
  LayoutIcon,
  MegaphoneIcon,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { PBLogo } from "@/assets/Import";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Image from "next/image";

export const adminSidebarItems = {
  navMain: [
    {
      title: "Admin Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
      isActive: true,
      items: [
        { title: "Dashboard", url: "/admin/dashboard" },
        { title: "Staffs", url: "/admin/staffs" },
        { title: "Roles", url: "/admin/roles" },
      ],
    },
    {
      title: "Product Management",
      url: "#",
      icon: PackageIcon,
      items: [
        { title: "Product List", url: "/admin/products" },
        { title: "Order List", url: "/admin/orders" },
        { title: "Brand", url: "/admin/brands" },
        { title: "Category", url: "/admin/categories" },
        { title: "Attribute", url: "/admin/attributes" },
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: UsersIcon,
      items: [
        { title: "Customers", url: "/admin/customers" },
        { title: "Transactions", url: "/admin/transactions" },
        { title: "Payments", url: "/admin/payments" },
      ],
    },
    {
      title: "Appearance",
      url: "#",
      icon: LayoutIcon,
      items: [
        { title: "Frontend Section", url: "/admin/frontend" },
        { title: "Home Section", url: "/admin/sections" },
        { title: "Menus", url: "/admin/menus" },
        { title: "Blogs", url: "/admin/blogs" },
        { title: "Videos", url: "/admin/videos" },
        { title: "Testimonials", url: "/admin/testimonials" },
        { title: "FAQs", url: "/admin/faqs" },
        { title: "Policy", url: "/admin/policy" },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: MegaphoneIcon,
      items: [
        { title: "Promotional Banner", url: "/admin/promotional" },
        { title: "Hero Banner", url: "/admin/hero" },
        { title: "Coupon", url: "/admin/coupon" },
        { title: "Campaign", url: "/admin/campaign" },
        { title: "Flash Deal List", url: "/admin/flashdeal" },
        { title: "Subscribers", url: "/admin/subscribers" },
        { title: "Contacts", url: "/admin/contacts" },
      ],
    },
    {
      title: "System Setting",
      url: "#",
      icon: Settings,
      items: [
        { title: "Send Mail", url: "#" },
        { title: "View Visitor", url: "#" },
        { title: "SEO", url: "#" },
        { title: "Language", url: "#" },
        { title: "Payment Methods", url: "#" },
        { title: "Email Configuration", url: "#" },
        { title: "SMS Configuration", url: "#" },
      ],
    },
  ],
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center min-h-16">
        <Image src={PBLogo} alt="Logo" width={100} height={100} />
      </SidebarHeader>

      <Separator className="mb-2" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {adminSidebarItems.navMain.map((item) => {
              const isGroupActive = item.items?.some((subItem) =>
                pathname.startsWith(subItem.url)
              );

              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isGroupActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={cn(
                          isGroupActive && "bg-sidebar-accent font-semibold"
                        )}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isActive = pathname === subItem.url;

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  isActive &&
                                    "text-primary bg-sidebar-accent font-semibold"
                                )}
                              >
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
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
