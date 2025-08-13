"use client";
import Link from "next/link";
import { DeleteButton, ViewButton } from "@/components/Global/ActionButtons";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Tag } from "@/components/Global/Tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { DateFormatter } from "@/components/Global/DateFormatter";
import { Space } from "@/components/Global/Space";

const AdminCustomersPage = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock customer data
  const [customers, setCustomers] = useState([
    {
      id: "50X1E",
      name: "Dr.Md. Abad-Bain",
      username: "N/A",
      email: "drbain70@gmail.com",
      phone: "0179161970",
      status: "Active",
      orders: 1,
      wishlist: 0,
      reviews: 0,
      joinedAt: "2025-08-07 02:48 PM",
      createdAt: "2025-08-07",
    },
    {
      id: "39B2F",
      name: "Nasif Reshani",
      username: "Nasif",
      email: "nasif.reshani@gmail.com",
      phone: "+8501983794342",
      status: "Active",
      orders: 3,
      wishlist: 2,
      reviews: 1,
      joinedAt: "2025-06-21 05:14 PM",
      createdAt: "2025-06-21",
    },
    {
      id: "87C4G",
      name: "Shafiq Rahman",
      username: "N/A",
      email: "shafiqsdu69@gmail.com",
      phone: "0779892456",
      status: "Banned",
      orders: 0,
      wishlist: 5,
      reviews: 0,
      joinedAt: "2025-07-08 01:03 PM",
      createdAt: "2025-07-08",
    },
    {
      id: "23D5H",
      name: "Abdul Baith",
      username: "Dr.Mir. Abdul Baith",
      email: "dbaiali70@gmail.com",
      phone: "077114870",
      status: "Active",
      orders: 7,
      wishlist: 3,
      reviews: 2,
      joinedAt: "2025-06-07 02:44 PM",
      createdAt: "2025-06-07",
    },
    {
      id: "65E6I",
      name: "Asmara Choudhury",
      username: "N/A",
      email: "nsasmracss666@gmail.com",
      phone: "07756-424566",
      status: "Banned",
      orders: 0,
      wishlist: 8,
      reviews: 0,
      joinedAt: "2025-06-18 03:22 AM",
      createdAt: "2025-06-18",
    },
  ]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      if (statusFilter !== "all" && customer.status !== statusFilter)
        return false;

      const searchLower = search.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.username.toLowerCase().includes(searchLower) ||
        customer.phone.toLowerCase().includes(searchLower)
      );
    });
  }, [customers, search, statusFilter]);

  const handleDelete = () => {
    if (customerToDelete) {
      setCustomers((prev) => prev.filter((c) => c.id !== customerToDelete.id));
      setCustomerToDelete(null);
      setShowDelete(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredCustomers.indexOf(row) + 1,
      },
      {
        header: "Customer Name",
        accessorKey: "customerInfo",
        cell: (_, row) => (
          <div>
            <div className="font-medium">{row.name}</div>
            {row.username !== "N/A" && (
              <div className="text-sm text-muted-foreground">
                @{row.username}
              </div>
            )}
          </div>
        ),
      },
      {
        header: "Contact",
        accessorKey: "contactInfo",
        cell: (_, row) => (
          <div>
            <div>{row.email}</div>
            <div className="text-sm text-muted-foreground">{row.phone}</div>
          </div>
        ),
      },
      {
        header: "Orders",
        accessorKey: "orders",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Joined At",
        accessorKey: "joinedAt",
        cell: (value) => (
          <div className="text-sm">
            <DateFormatter date={value} />
          </div>
        ),
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <Link href={`/admin/customers/${row.id}`}>
              <ViewButton />
            </Link>
            <DeleteButton
              onClick={() => {
                setCustomerToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredCustomers]
  );

  return (
    <div>
      <AdminPageHeader
        title="Customer List"
        subtitle="Manage Customers Details and Orders"
        actions={
          <>
            <Tabs
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Active">Active</TabsTrigger>
                <TabsTrigger value="Banned">Banned</TabsTrigger>
              </TabsList>
            </Tabs>

            <Input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
          </>
        }
      />

      <GlobalTable
        data={filteredCustomers}
        columns={columns}
        itemsPerPage={5}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete "${customerToDelete?.name}"?`}
      />
    </div>
  );
};

export default AdminCustomersPage;
