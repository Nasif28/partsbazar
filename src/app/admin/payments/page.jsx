"use client";
import Link from "next/link";
import { DeleteButton, ViewButton } from "@/components/Global/ActionButtons";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import React, { useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { DateFormatter } from "@/components/Global/DateFormatter";
import { Space } from "@/components/Global/Space";
import { Tag } from "@/components/Global/Tag";

const AdminPaymentsPage = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [payments, setPayments] = useState([
    {
      id: "PMT2001",
      time: "2025-08-11 02:48 PM",
      user: "Mahfuz Rahman",
      paymentMethod: "Bkash",
      amount: 1500,
      status: "Pending",
      reference: "ORD-1021",
    },
    {
      id: "PMT2002",
      time: "2025-08-10 05:14 PM",
      user: "Rakib Hasan",
      paymentMethod: "Nagad",
      amount: 3500,
      status: "Approved",
      reference: "ORD-1020",
    },
    {
      id: "PMT2003",
      time: "2025-08-09 01:03 PM",
      user: "Sara Akter",
      paymentMethod: "Bank Transfer",
      amount: 2200,
      status: "Rejected",
      reference: "ORD-1019",
    },
    {
      id: "PMT2004",
      time: "2025-08-09 02:44 PM",
      user: "Guest Checkout",
      paymentMethod: "Credit Card",
      amount: 1800,
      status: "Approved",
      reference: "ORD-1018",
    },
    {
      id: "PMT2005",
      time: "2025-08-08 03:22 AM",
      user: "Jahidul Islam",
      paymentMethod: "Bkash",
      amount: 7200,
      status: "Pending",
      reference: "ORD-1017",
    },
  ]);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;

      const searchLower = search.toLowerCase();
      return (
        p.user.toLowerCase().includes(searchLower) ||
        p.id.toLowerCase().includes(searchLower) ||
        p.paymentMethod.toLowerCase().includes(searchLower) ||
        p.reference.toLowerCase().includes(searchLower)
      );
    });
  }, [payments, search, statusFilter]);

  const handleDelete = () => {
    if (paymentToDelete) {
      setPayments((prev) => prev.filter((p) => p.id !== paymentToDelete.id));
      setPaymentToDelete(null);
      setShowDelete(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "S/N",
        accessorKey: "sn",
        cell: (_, row) => filteredPayments.indexOf(row) + 1,
      },
      {
        header: "Time",
        accessorKey: "time",
        cell: (value) => <DateFormatter date={value} />,
      },
      {
        header: "User",
        accessorKey: "user",
      },
      {
        header: "Payment Method",
        accessorKey: "paymentMethod",
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: (value) => `৳${value}`,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Reference ID",
        accessorKey: "reference",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <Link href={`/admin/payments/${row.id}`}>
              <ViewButton />
            </Link>
            <DeleteButton
              onClick={() => {
                setPaymentToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredPayments]
  );

  return (
    <div>
      <AdminPageHeader
        title="Payment List"
        subtitle="Manage all platform payments"
        actions={
          <>
            <Tabs
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="Pending">Pending Payments</TabsTrigger>
                <TabsTrigger value="Approved">Approved Payments</TabsTrigger>
                <TabsTrigger value="Rejected">Rejected Payments</TabsTrigger>
              </TabsList>
            </Tabs>

            <Input
              type="text"
              placeholder="Search payments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
          </>
        }
      />

      <GlobalTable data={filteredPayments} columns={columns} itemsPerPage={5} />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Payment"
        message={`Are you sure you want to delete payment "${paymentToDelete?.id}"?`}
      />
    </div>
  );
};

export default AdminPaymentsPage;
