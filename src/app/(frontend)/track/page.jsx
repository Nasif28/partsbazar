"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  X,
  Package,
  CheckCircle,
  Clock,
  Search,
  User,
  Phone,
  Location,
  Map,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/Global/PageHeader";
import { Separator } from "@/components/ui/separator";
import { AddressIcon } from "@/assets/Import";
import Link from "next/link";
import { Loading } from "@/components/SVG/Loading";
import { GlobalTable } from "@/components/Global/GlobalTable";

const orders = [
  {
    id: "pb-00351",
    email: "customer@example.com",
    orderDate: "05 Jul 2025",
    shippingMethod: "Standard Delivery",
    status: "cancelled",
    billingInfo: {
      addressName: "Home",
      firstName: "Md Sofiul Melek",
      lastName: "UANE",
      phone: "01857787486",
      address:
        "Hori kishor Rey Road Durloo Tower, Lift & A Notun Razer Behind rajbari",
      address2: "Neor city corporation",
      zip: "120",
      country: "Bangladesh",
      state: "Dhaka",
      city: "Dhaka",
    },
    orderInfo: {
      orderNumber: "PB-00351",
      paymentMethod: "Cash On Delivery",
      totalAmount: "1,800.01৳",
      paymentStatus: "Unpaid",
      orderStatus: "Cancelled",
      date: "1 week ago",
    },
    items: [
      { id: 1, name: "Car Engine Oil", price: "450.00", quantity: 2 },
      { id: 2, name: "Air Filter", price: "320.50", quantity: 1 },
      { id: 3, name: "Brake Pads", price: "759.51", quantity: 1 },
    ],
    tracking: [
      { step: "Order Placed", date: "05 Jul 2025, 10:30 AM", completed: true },
      { step: "Processing", date: "06 Jul 2025, 09:15 AM", completed: true },
      { step: "Shipped", date: "07 Jul 2025, 02:45 PM", completed: false },
      { step: "Out for Delivery", date: null, completed: false },
      { step: "Delivered", date: null, completed: false },
    ],
  },
  {
    id: "pb-00352",
    email: "customer2@example.com",
    orderDate: "10 Jul 2025",
    shippingMethod: "Express Delivery",
    status: "in-progress",
    billingInfo: {
      addressName: "Office",
      firstName: "John",
      lastName: "Doe",
      phone: "01712345678",
      address: "123 Business Tower, Commercial Area",
      address2: "Dhaka Central Business District",
      zip: "1212",
      country: "Bangladesh",
      state: "Dhaka",
      city: "Dhaka",
    },
    orderInfo: {
      orderNumber: "PB-00352",
      paymentMethod: "Credit Card",
      totalAmount: "2,450.75৳",
      paymentStatus: "Paid",
      orderStatus: "Processing",
      date: "2 days ago",
    },
    items: [
      { id: 1, name: "Spark Plugs", price: "280.00৳", quantity: 4 },
      { id: 2, name: "Oil Filter", price: "150.75৳", quantity: 2 },
    ],
    tracking: [
      { step: "Order Placed", date: "10 Jul 2025, 11:20 AM", completed: true },
      { step: "Processing", date: "11 Jul 2025, 10:00 AM", completed: true },
      { step: "Shipped", date: "12 Jul 2025, 03:15 PM", completed: true },
      {
        step: "Out for Delivery",
        date: "13 Jul 2025, 09:30 AM",
        completed: false,
      },
      { step: "Delivered", date: null, completed: false },
    ],
  },
  {
    id: "pb-00353",
    email: "customer3@example.com",
    orderDate: "15 Jul 2025",
    shippingMethod: "Standard Delivery",
    status: "delivered",
    billingInfo: {
      addressName: "Home",
      firstName: "Sarah",
      lastName: "Johnson",
      phone: "01987654321",
      address: "456 Residential Area, Garden Street",
      address2: "Chittagong Hillside",
      zip: "1300",
      country: "Bangladesh",
      state: "Chittagong",
      city: "Chittagong",
    },
    orderInfo: {
      orderNumber: "PB-00353",
      paymentMethod: "Bkash",
      totalAmount: "3,150.25৳",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      date: "Today",
    },
    items: [
      { id: 1, name: "Car Battery", price: "2,800.00৳", quantity: 1 },
      { id: 2, name: "Wiper Blades", price: "350.25৳", quantity: 2 },
    ],
    tracking: [
      { step: "Order Placed", date: "15 Jul 2025, 02:15 PM", completed: true },
      { step: "Processing", date: "15 Jul 2025, 04:30 PM", completed: true },
      { step: "Shipped", date: "16 Jul 2025, 10:00 AM", completed: true },
      {
        step: "Out for Delivery",
        date: "16 Jul 2025, 01:45 PM",
        completed: true,
      },
      { step: "Delivered", date: "16 Jul 2025, 03:20 PM", completed: true },
    ],
  },
];

const statusConfig = {
  cancelled: {
    color: "bg-primary",
    icon: <X className="h-5 w-5 text-white" />,
    text: "Cancelled",
    progress: 30,
  },
  "in-progress": {
    color: "bg-blue-500",
    icon: <Clock className="h-5 w-5 text-white" />,
    text: "In Progress",
    progress: 60,
  },
  delivered: {
    color: "bg-green-500",
    icon: <CheckCircle className="h-5 w-5 text-white" />,
    text: "Delivered",
    progress: 100,
  },
};

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTrackingId("pb-00351");
    setEmail("customer@example.com");
  }, []);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const foundOrder = orders.find(
        (o) =>
          o.id.toLowerCase() === trackingId.toLowerCase() &&
          o.email.toLowerCase() === email.toLowerCase()
      );

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError(
          "No order found with the provided details. Please check and try again."
        );
      }

      setIsLoading(false);
    }, 800);
  };

  const getStatusInfo = (status) => {
    return statusConfig[status] || statusConfig.cancelled;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => order.items.indexOf(row) + 1,
      },
      {
        header: "Product",
        accessorKey: "name",
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (value) => <> {value}৳</>,
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
      },
      {
        header: "Total",
        accessorKey: "total",
        cell: (_, row) => <> {row.price * row.quantity}৳</>,
      },
    ],
    [order]
  );

  return (
    <main>
      <PageHeader
        title="Track Your Order"
        description="Enter your Order ID and Billing Email below to track your order status"
      />

      <div className="myContainer">
        <div className="container mx-auto pageP">
          {/* Tracking Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <Card className="bg-card border border-border rounded-xl shadow-sm">
              <CardContent>
                <form onSubmit={handleTrackOrder} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        TRACKING ID
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="e.g. pb-00351"
                          value={trackingId}
                          onChange={(e) => setTrackingId(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          <Package className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Found in your order confirmation email
                      </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        BILLING EMAIL
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Email you used during checkout"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          <Search className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The email associated with your order
                      </p>
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full py-2 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-lg transition duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <Loading />
                          Tracking Order...
                        </div>
                      ) : (
                        "Track Order"
                      )}
                    </Button>
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 p-2 bg-destructive/10 text-destructive rounded-lg flex items-center"
                    >
                      <X className="h-5 w-5 mr-2" />
                      {error}
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Tracking Results */}
          {order ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <Card className="py-0 border overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary-dark/30 pt-5 pb-4">
                  <CardTitle className="flex justify-between items-center gap-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground p-2 rounded-lg mr-3">
                        <Package className="h-5 w-5" />
                      </span>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">
                          Order Tracking
                        </h2>
                        <p className="text-muted-foreground text-sm uppercase">
                          ID: {order.id}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`inline-flex items-center px-3 py-1.5 h-10 rounded-md text-sm font-medium ${
                        getStatusInfo(order.status).color
                      } text-white`}
                    >
                      {getStatusInfo(order.status).icon}
                      <span className="ml-2">
                        {getStatusInfo(order.status).text}
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-10 py-2">
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Order Progress
                      </span>
                      <span className="text-sm font-medium text-primary">
                        {getStatusInfo(order.status).progress}%
                      </span>
                    </div>
                    <Progress
                      value={getStatusInfo(order.status).progress}
                      className="h-2.5 bg-muted"
                    />
                  </div>

                  {/* Tracking timeline */}
                  <div>
                    <h3 className="text-lg font-semibold mb-6 text-foreground">
                      Tracking History
                    </h3>

                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>

                      <div className="space-y-4 pl-10">
                        {order.tracking.map((step, index) => (
                          <div key={index} className="relative">
                            {/* Step indicator */}
                            <div
                              className={`absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                step.completed
                                  ? "bg-primary text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {step.completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <span className="text-xs font-bold">
                                  {index + 1}
                                </span>
                              )}
                            </div>

                            <div
                              className={`border-l-2 pl-6 ml-2 ${
                                index === order.tracking.length - 1
                                  ? ""
                                  : "border-primary/20"
                              }`}
                            >
                              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                                <h4
                                  className={`font-medium ${
                                    step.completed
                                      ? "text-primary"
                                      : "text-foreground"
                                  }`}
                                >
                                  {step.step}
                                </h4>

                                {step.date && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {step.date}
                                  </p>
                                )}
                                {!step.completed && !step.date && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Pending
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator className="mb-6 mt-10" />

                  {/* Order Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Billing Info */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">
                        Billing Information
                      </h3>
                      <Card className="bg-muted/20 border-border">
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex gap-4">
                              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                <User />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Full Name
                                </p>
                                <p className="font-medium">
                                  {order.billingInfo.firstName}{" "}
                                  {order.billingInfo.lastName}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                <Phone />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Phone
                                </p>
                                <p className="font-medium">
                                  {order.billingInfo.phone}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                <MapPin />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Address
                                </p>
                                <p className="font-medium">
                                  {order.billingInfo.address}
                                </p>
                                <p className="font-medium">
                                  {order.billingInfo.address2}
                                </p>
                                <p className="text-muted-foreground">
                                  {order.billingInfo.city},{" "}
                                  {order.billingInfo.state}{" "}
                                  {order.billingInfo.zip}
                                </p>
                                <p className="text-muted-foreground">
                                  {order.billingInfo.country}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">
                        Order Summary
                      </h3>
                      <Card className="bg-muted/20 border-border">
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Order Number
                              </span>
                              <span className="font-medium">
                                {order.orderInfo.orderNumber}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Order Date
                              </span>
                              <span className="font-medium">
                                {order.orderDate}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Payment Method
                              </span>
                              <span className="font-medium">
                                {order.orderInfo.paymentMethod}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Payment Status
                              </span>
                              <span
                                className={`font-medium ${
                                  order.orderInfo.paymentStatus === "Paid"
                                    ? "text-green-600"
                                    : "text-destructive"
                                }`}
                              >
                                {order.orderInfo.paymentStatus}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Shipping Method
                              </span>
                              <span className="font-medium">
                                {order.shippingMethod}
                              </span>
                            </div>

                            <div className="pt-2 border-t border-border">
                              <div className="flex justify-between">
                                <span className="text-lg font-semibold">
                                  Total Amount
                                </span>
                                <span className="text-xl font-bold text-primary">
                                  {order.orderInfo.totalAmount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Separator className="mb-6 mt-10" />

                  {/* Order Items */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">
                      Order Items
                    </h3>

                    <GlobalTable
                      data={order.items}
                      columns={columns}
                      itemsPerPage={10}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Support CTA */}
              <div className="text-center py-2">
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Need Help With Your Order?
                </h3>

                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our support team is ready to assist you with any questions
                  about your order or delivery.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="bg-card border-primary text-primary hover:bg-primary/10"
                    >
                      Contact Support
                    </Button>
                  </Link>

                  <Link href="/user/orders">
                    <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                      View Order History
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 text-primary rounded-full mb-6">
                <Package className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Track Your Order
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Enter your order details above to view real-time tracking
                information, delivery status, and order history.
              </p>
              <Button
                variant="outline"
                className="bg-card border-border text-foreground"
              >
                View Order History
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
