"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { Space } from "@/components/Global/Space";
import { DeleteButton, EditButton } from "@/components/Global/ActionButtons";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { CouponModal } from "@/components/Admin/CouponModal";
import { Tag } from "@/components/Global/Tag";
import { formatDate } from "date-fns";
import { DateFormatter } from "@/components/Global/DateFormatter";

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  useEffect(() => {
    // fake data
    setCoupons([
      {
        id: 1,
        name: "Summer Sale",
        code: "SUMMER25",
        type: "percentage",
        value: 25,
        startDate: "2025-08-01",
        endDate: "2025-08-31",
        status: "active",
      },
      {
        id: 2,
        name: "Welcome Offer",
        code: "WELCOME",
        type: "amount",
        value: 100,
        startDate: "2025-08-10",
        endDate: "2025-12-31",
        status: "inactive",
      },
      {
        id: 3,
        name: "Clearance Discount",
        code: "CLEAR30",
        type: "percentage",
        value: 30,
        startDate: "2023-07-01",
        endDate: "2023-07-15",
        status: "inactive",
      },
    ]);
  }, []);

  useEffect(() => {
    setFilteredCoupons(
      coupons.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [coupons, search]);

  const handleAddOrUpdate = (data) => {
    if (selectedCoupon) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === selectedCoupon.id ? { ...c, ...data } : c))
      );
    } else {
      const newCoupon = { ...data, id: Date.now() };
      setCoupons((prev) => [...prev, newCoupon]);
    }
    setSelectedCoupon(null);
  };

  const handleDelete = () => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponToDelete.id));
    setCouponToDelete(null);
    setShowDelete(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredCoupons.indexOf(row) + 1,
      },
      { header: "Name", accessorKey: "name" },
      {
        header: "Code",
        accessorKey: "code",
        cell: (value) => (
          <span className="bg-primary/10 text-primary px-2 py-1 rounded">
            {value}
          </span>
        ),
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: (v) => (v === "percentage" ? "Percentage" : "Amount"),
      },
      {
        header: "Value",
        accessorKey: "value",
        cell: (value, row) => (
          <span>
            {row.type === "percentage" ? `${value}%` : `৳${value.toFixed(2)}`}
          </span>
        ),
      },
      {
        header: "Validity",
        accessorKey: "dates",
        cell: (_, row) => (
          <div className="text-xs text-muted-foreground">
            <div className="flex gap-1">
              <span>S: </span>
              <DateFormatter
                date={row.startDate}
                showAgo={false}
                showTime={false}
              />
            </div>
            <div className="flex gap-1">
              <span>E: </span>
              <DateFormatter
                date={row.endDate}
                showAgo={false}
                showTime={false}
              />
            </div>
          </div>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <EditButton
              onClick={() => {
                setSelectedCoupon(row);
                setShowModal(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                setCouponToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredCoupons]
  );

  return (
    <div>
      <AdminPageHeader
        title="Manage Coupons"
        actions={
          <>
            <Input
              type="text"
              placeholder="Search by coupon name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
            <Button
              onClick={() => {
                setSelectedCoupon(null);
                setShowModal(true);
              }}
            >
              Add Coupon
              <Plus className="w-4 h-4" />
            </Button>
          </>
        }
      />

      <GlobalTable
        data={filteredCoupons}
        columns={columns}
        itemsPerPage={10}
        className="w-full"
      />

      <CouponModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedCoupon}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Coupon"
        message={`Are you sure you want to delete ${couponToDelete?.name}?`}
      />
    </div>
  );
};

export default AdminCouponsPage;
