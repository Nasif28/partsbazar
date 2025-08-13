"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Tag } from "@/components/Global/Tag";
import { Empty } from "@/components/Global/Empty";
import ordersData from "@/data/Orders.json";
import {
  ListOrdered,
  Clock,
  ShoppingCart,
  CheckCircle,
  Settings,
  Truck,
  PackageCheck,
  XCircle,
  RotateCcw,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateFormatter } from "@/components/Global/DateFormatter";
import {
  DeleteButton,
  DetailsButton,
  EditButton,
  PrintButton,
  ViewButton,
} from "@/components/Global/ActionButtons";
import { Space } from "@/components/Global/Space";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";

const AdminOrdersPage = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { label: "All", icon: ListOrdered },
    { label: "Pending", icon: Clock },
    { label: "Placed", icon: ShoppingCart },
    { label: "Confirmed", icon: CheckCircle },
    { label: "Processing", icon: Settings },
    { label: "Shipped", icon: Truck },
    { label: "Delivered", icon: PackageCheck },
    { label: "Canceled", icon: XCircle },
    { label: "Return", icon: RotateCcw },
  ];

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.phone.toLowerCase().includes(search.toLowerCase());

      const matchesTab = activeTab === "All" || order.orderStatus === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab, ordersData]);

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredOrders.indexOf(row) + 1,
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
        header: "Customer Info",
        accessorKey: "customer",
        cell: (value) => (
          <div>
            <div className="font-medium">{value.name}</div>
            <div className="text-sm text-muted-foreground">{value.phone}</div>
          </div>
        ),
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: (value) => <DateFormatter date={value} />,
      },
      {
        header: "Payment Status",
        accessorKey: "paymentStatus",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Order Status",
        accessorKey: "orderStatus",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: (value) => `$${value.toFixed(2)}`,
      },
      {
        header: "Shipping Method",
        accessorKey: "shippingMethod",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <ViewButton
              onClick={() => {
                setSelectedBrand(row);
                setShowModal(true);
              }}
            />
            <PrintButton
              onClick={() => {
                setSelectedBrand(row);
                setShowModal(true);
              }}
            />
            <EditButton
              onClick={() => {
                setSelectedBrand(row);
                setShowModal(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                setBrandToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <div>
      {/* Header  */}
      <AdminPageHeader
        title="Manage Orders"
        actions={
          <>
            <Input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
            <Button
              onClick={() => {
                setSelectedCategory(null);
                setShowModal(true);
              }}
            >
              Add Order
              <Plus className="w-4 h-4" />
            </Button>
          </>
        }
      />

      {/* Tab Navigation */}
      <div className="border-b border-border mb-6">
        <nav className="flex space-x-8 overflow-x-auto py-2">
          {tabs.map(({ label, icon: Icon }) => (
            <Button
              variant="ghost"
              key={label}
              className={cn(
                "rounded-none cursor-pointer hover:bg-transparent dark:hover:bg-transparent",
                activeTab === label
                  ? "text-primary hover:text-primary-dark font-semibold border-b-2 border-primary"
                  : "text-muted-foreground dark:hover:bg-transparent"
              )}
              onClick={() => setActiveTab(label)}
            >
              <Icon className="w-4 h-4 inline-block" />
              {label}
            </Button>
          ))}
        </nav>
      </div>

      {filteredOrders.length > 0 ? (
        <GlobalTable
          data={filteredOrders}
          columns={columns}
          itemsPerPage={10}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default AdminOrdersPage;
