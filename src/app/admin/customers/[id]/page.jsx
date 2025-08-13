"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  ShoppingBag,
  Wallet,
  Package,
  Mail,
  Phone,
  Calendar,
  Star,
  Heart,
  MessageSquare,
  MapPin,
  Globe,
  RefreshCw,
  ArrowRight,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { Tag } from "@/components/Global/Tag";
import { DateFormatter } from "@/components/Global/DateFormatter";
import Image from "next/image";

const CustomerDetailsPage = ({ params }) => {
  const [activeTab, setActiveTab] = useState("orders");

  // Mock customer data
  const customer = {
    id: "50X1E",
    name: "Dr. Md. Abad-Bain",
    username: "N/A",
    email: "drbain70@gmail.com",
    phone: "0179161970",
    status: "Active",
    orders: 1,
    wishlist: 0,
    reviews: 0,
    joinedAt: "2025-08-07 02:48 PM",
    address: "123 Main Street, Dhaka",
    city: "Dhaka",
    country: "Bangladesh",
    state: "Dhaka Division",
    zip: "1207",
    image: "/images/avatar.png",
  };

  // Mock orders data
  const orders = [
    {
      id: "PB-00262",
      date: "2025-08-12",
      status: "Delivered",
      amount: 3899.41,
      products: 3,
      payment: "Credit Card",
    },
    {
      id: "PB-00158",
      date: "2025-07-28",
      status: "Cancelled",
      amount: 2450.0,
      products: 2,
      payment: "Bkash",
    },
    {
      id: "PB-00097",
      date: "2025-07-15",
      status: "Returned",
      amount: 1899.99,
      products: 1,
      payment: "Credit Card",
    },
    {
      id: "PB-00042",
      date: "2025-06-22",
      status: "Delivered",
      amount: 3200.5,
      products: 4,
      payment: "Cash on Delivery",
    },
  ];

  // Summary cards data
  const summaryCards = [
    {
      title: "Total Orders",
      value: customer.orders,
      icon: <ShoppingBag className="w-6 h-6" />,
      change: "+2.5%",
      description: "From last month",
    },
    {
      title: "Total Transaction",
      value: "389,941.0 TK.",
      icon: <Wallet className="w-6 h-6" />,
      change: "+12.3%",
      description: "From last month",
    },
    {
      title: "Total Products",
      value: "24",
      icon: <Package className="w-6 h-6" />,
      change: "+5.7%",
      description: "From last month",
    },
  ];

  // Orders table columns
  const orderColumns = [
    {
      header: "#",
      accessorKey: "sn",
      cell: (_, row) => orders.indexOf(row) + 1,
    },
    {
      header: "Order ID",
      accessorKey: "id",
      cell: (value) => (
        <a
          href={`/admin/orders/${value}`}
          className="text-primary hover:underline font-medium"
        >
          {value}
        </a>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (value) => <DateFormatter date={value} />,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value) => <Tag status={value} />,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (value) => <div>{value.toFixed(2)} TK.</div>,
    },
    {
      header: "Products",
      accessorKey: "products",
    },
    {
      header: "Payment",
      accessorKey: "payment",
    },
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: customer.name,
    email: customer.email,
    address: customer.address,
    city: customer.city,
    country: customer.country,
    state: customer.state,
    zip: customer.zip,
    status: customer.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, this would call an API
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <AdminPageHeader
        title="Customer Details"
        subtitle={`ID: ${customer.id}`}
      />

      {/* Customer Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-muted border-4 border-border flex items-center justify-center">
              {customer.image ? (
                <Image
                  src={customer.image}
                  alt={customer.name}
                  height={100}
                  width={100}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-muted" />
              )}
            </div>

            <div className="absolute bottom-1 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
              <div className="bg-green-400 rounded-full w-3 h-3 flex items-center justify-center">
                <div className="bg-green-300 rounded-full w-1 h-1"></div>
              </div>
            </div>
          </div>

          <div className="ml-6">
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            <div className="flex items-center text-muted-foreground mt-1">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Joined on {customer.joinedAt}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </Button>
          <Button variant="destructive">Delete Customer</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Customer Info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {summaryCards.map((card, index) => (
              <Card key={index}>
                <CardContent className="px-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {card.title}
                      </div>
                      <div className="text-2xl font-bold my-1">
                        {card.value}
                      </div>
                      <div className="text-sm text-primary flex items-center">
                        <span>{card.change}</span>
                        <span className="ml-2 text-muted-foreground">
                          {card.description}
                        </span>
                      </div>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg">
                      {card.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Customer Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Username
                      </div>
                      <div className="font-medium">{customer.username}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{customer.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="font-medium">{customer.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Number of Orders
                      </div>
                      <div className="font-medium">{customer.orders}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <Heart className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Total Item Wishlist
                      </div>
                      <div className="font-medium">{customer.wishlist}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <MessageSquare className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Total Products Reviewed
                      </div>
                      <div className="font-medium">{customer.reviews}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Section */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  All Orders
                </CardTitle>
                <div className="flex space-x-2">
                  <Input placeholder="Search orders..." className="w-48" />
                  <Button variant="outline">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                  <div className="max-h-[400px] overflow-y-auto">
                    <GlobalTable
                      data={orders}
                      columns={orderColumns}
                      itemsPerPage={5}
                      hidePagination={true}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Update Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Customer Information Update
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-end mb-2">
                    <User className="w-4 h-4" />
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-end mb-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="flex items-end mb-2">
                    <MapPin className="w-4 h-4" />
                    Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="flex items-end mb-2">
                      <MapPin className="w-4 h-4" />
                      City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="country" className="flex items-end mb-2">
                      <Globe className="w-4 h-4" />
                      Country *
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, country: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                        <SelectItem value="Nepal">Nepal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state" className="flex items-end mb-2">
                      <MapPin className="w-4 h-4" />
                      State *
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="zip" className="flex items-end mb-2">
                      <MapPin className="w-4 h-4" />
                      Zip *
                    </Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status" className="flex items-end mb-2">
                    <User className="w-4 h-4" />
                    Status *
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Banned">Banned</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end mt-2">
                  <Button type="submit" className="w-full">
                    Update Information
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
