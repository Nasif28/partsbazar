"use client";
import Link from "next/link";
import { DeleteButton, ViewButton } from "@/components/Global/ActionButtons";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { DateFormatter } from "@/components/Global/DateFormatter";
import { Space } from "@/components/Global/Space";

const AdminTransactionsPage = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [transactions, setTransactions] = useState([
    {
      id: "TXN1001",
      date: "2025-08-11 02:48 PM",
      customer: "Mahfuz Rahman",
      transactionType: "User",
      amount: 1500,
      details: "Order #1021 Payment",
    },
    {
      id: "TXN1002",
      date: "2025-08-10 05:14 PM",
      customer: "Rakib Hasan",
      transactionType: "Seller",
      amount: 3500,
      details: "Commission Payout",
    },
    {
      id: "TXN1003",
      date: "2025-08-09 01:03 PM",
      customer: "Guest Checkout",
      transactionType: "Guest",
      amount: 2200,
      details: "Order #1023 Payment",
    },
    {
      id: "TXN1004",
      date: "2025-08-09 02:44 PM",
      customer: "Sara Akter",
      transactionType: "User",
      amount: 1800,
      details: "Order #1024 Refund",
    },
    {
      id: "TXN1005",
      date: "2025-08-08 03:22 AM",
      customer: "Jahidul Islam",
      transactionType: "Seller",
      amount: 7200,
      details: "Commission Payout",
    },
  ]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      if (typeFilter !== "all" && txn.transactionType !== typeFilter)
        return false;

      const searchLower = search.toLowerCase();
      return (
        txn.customer.toLowerCase().includes(searchLower) ||
        txn.id.toLowerCase().includes(searchLower) ||
        txn.details.toLowerCase().includes(searchLower)
      );
    });
  }, [transactions, search, typeFilter]);

  const handleDelete = () => {
    if (transactionToDelete) {
      setTransactions((prev) =>
        prev.filter((t) => t.id !== transactionToDelete.id)
      );
      setTransactionToDelete(null);
      setShowDelete(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredTransactions.indexOf(row) + 1,
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: (value) => (
          <div className="text-sm">
            <DateFormatter date={value} />
          </div>
        ),
      },
      {
        header: "Customer",
        accessorKey: "customer",
      },
      {
        header: "Transaction ID",
        accessorKey: "id",
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: (value) => `৳${value}`,
      },
      {
        header: "Details",
        accessorKey: "details",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <Link href={`/admin/transactions/${row.id}`}>
              <ViewButton />
            </Link>
            <DeleteButton
              onClick={() => {
                setTransactionToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredTransactions]
  );

  return (
    <div>
      <AdminPageHeader
        title="Transactions List"
        subtitle="Manage all platform transactions"
        actions={
          <>
            <Tabs
              value={typeFilter}
              onValueChange={setTypeFilter}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="User">User Transactions</TabsTrigger>
                <TabsTrigger value="Seller">Seller Transactions</TabsTrigger>
                <TabsTrigger value="Guest">Guest Transactions</TabsTrigger>
              </TabsList>
            </Tabs>

            <Input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
          </>
        }
      />

      <GlobalTable
        data={filteredTransactions}
        columns={columns}
        itemsPerPage={5}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Transaction"
        message={`Are you sure you want to delete transaction "${transactionToDelete?.id}"?`}
      />
    </div>
  );
};

export default AdminTransactionsPage;
