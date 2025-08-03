"use client";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Eye,
  MapPin,
  ArrowUpDown,
  ChevronDown,
  ShoppingCart,
  Heart,
  Edit,
  Trash,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { GlobalTable } from "@/components/Global/GlobalTable";

const orderSummaryData = [
  { title: "All Orders", value: 1, icon: ShoppingCart },
  { title: "Placed Order", value: 1, icon: ShoppingCart },
  { title: "Pending Orders", value: 1, icon: ShoppingCart },
  { title: "Processing Orders", value: 0, icon: ShoppingCart },
  { title: "Shipped Orders", value: 0, icon: ShoppingCart },
  { title: "Delivered Orders", value: 0, icon: ShoppingCart },
  { title: "Completed Orders", value: 0, icon: ShoppingCart },
  { title: "Cancelled Orders", value: 0, icon: ShoppingCart },
];

const wishlistData = { title: "My Wishlist", value: 2 };
const cartData = { title: "My Cart", value: 4 };
const followedStoresData = { title: "Followed Stores", value: 0 };

const orders = [
  {
    id: "PB-00335",
    placedOn: "2025-06-21 06:14 PM",
    quantity: 1,
    total: "5,600.01K",
    paymentStatus: "Unpaid",
  },
  {
    id: "PB-00336",
    placedOn: "2025-06-22 10:30 AM",
    quantity: 2,
    total: "8,450.75K",
    paymentStatus: "Paid",
  },
  {
    id: "PB-00337",
    placedOn: "2025-06-20 03:45 PM",
    quantity: 1,
    total: "3,200.50K",
    paymentStatus: "Processing",
  },
];

export default function DashboardPage() {
  const [sortBy, setSortBy] = useState("All");
  const [sortConfig, setSortConfig] = useState(null);

  // Sorting function
  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    if (a[key] < b[key]) {
      return direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const columns = useMemo(
    () => [
      { header: "Ooder Id", accessorKey: "id" },
      {
        header: "Place On",
        accessorKey: "placedOn",
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
      },
      { header: "Total", accessorKey: "total" },
      { header: "Payment Status", accessorKey: "paymentStatus" },
      {
        header: "Actions",
        cell: () => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8"
              onClick={() => console.log("Editing:")}
            >
              <Edit />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8"
              onClick={() => console.log("Editing:")}
            >
              <Trash2 />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      <div className="space-y-6">
        {/* Order Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {orderSummaryData.map((summary, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow p-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-primary/20 p-2">
                  {<summary.icon className="text-primary" />}
                </div>

                <div>
                  <div className="text-2xl font-bold">{summary.value}</div>
                  <div className="text-xs text-muted-foreground">
                    {summary.title}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Other Card  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Wishlist Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {wishlistData.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{wishlistData.value}</div>
                <Button>View Cart</Button>
              </div>
            </CardContent>
          </Card>

          {/* Cart Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {cartData.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{cartData.value}</div>
                <Button>View Cart</Button>
              </div>
            </CardContent>
          </Card>

          {/* Followed Stores Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {followedStoresData.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">
                  {followedStoresData.value}
                </div>
                <Button>View Cart</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>Order List</div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">SORT BY:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-24 justify-between"
                    >
                      {sortBy} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="min-w-24">
                    <DropdownMenuItem onClick={() => setSortBy("All")}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Recent")}>
                      Recent
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Price")}>
                      Price
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Status")}>
                      Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <GlobalTable
              data={orders}
              columns={columns}
              itemsPerPage={5}
              className="w-full"
            />

            {orders.length === 0 && (
              <div className="py-12 text-center text-[var(--muted-foreground)]">
                No orders found. Start shopping to see your orders here.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Dashboard Elements */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-full mr-3">
                    <ShoppingCart className="h-4 w-4 text-primary-foreground" />
                  </div>

                  <div>
                    <p className="font-medium">Order placed</p>
                    <p className="text-sm text-muted-foreground">
                      You placed order PB-00335
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-full mr-3">
                    <Heart className="h-4 w-4 text-primary-foreground" />
                  </div>

                  <div>
                    <p className="font-medium">Item added to wishlist</p>
                    <p className="text-sm text-muted-foreground">
                      Brake pads added to your wishlist
                    </p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Parts</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-3 gap-4 gap-auto">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex-shrink-0">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                    <p className="text-sm font-medium mt-2 text-center">
                      Engine Oil Filter
                    </p>

                    <p className="text-primary text-center font-bold">$24.99</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
