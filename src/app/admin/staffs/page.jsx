"use client";

import { StaffModal } from "@/components/Admin/Dashboard/StaffModal";
import { DeleteButton, EditButton } from "@/components/Global/ActionButtons";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Space } from "@/components/Global/Space";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";

const AdminStaffsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [staffs, setStaffs] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      status: "Active",
      createdAt: "2023-01-01",
      createdby: "Ibrahim",
      role: "Manager",
      photo: "/images/john.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "123-456-7890",
      status: "Inactive",
      createdAt: "2023-01-02",
      createdby: "Ibrahim",
      role: "Support",
      photo: "/images/jane.jpg",
    },
  ]);

  const handleAddOrUpdate = (data) => {
    if (selectedStaff) {
      // update
      setStaffs((prev) =>
        prev.map((s) => (s.id === selectedStaff.id ? { ...s, ...data } : s))
      );
    } else {
      // create
      const newStaff = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        createdby: "Admin",
      };
      setStaffs((prev) => [...prev, newStaff]);
    }
    setSelectedStaff(null);
  };

  const handleDelete = () => {
    setStaffs((prev) => prev.filter((s) => s.id !== staffToDelete.id));
    setStaffToDelete(null);
    setShowDelete(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => staffs.indexOf(row) + 1,
      },
      {
        header: "Photo",
        accessorKey: "photo",
        cell: (value) => (
          <img
            src={value}
            alt="Staff"
            className="h-8 w-8 rounded-full object-cover"
          />
        ),
      },
      { header: "Name", accessorKey: "name" },
      { header: "Role", accessorKey: "role" },
      { header: "Email", accessorKey: "email" },
      { header: "Phone", accessorKey: "phone" },
      { header: "Status", accessorKey: "status" },
      { header: "Created At", accessorKey: "createdAt" },
      { header: "Created By", accessorKey: "createdby" },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <EditButton
              onClick={() => {
                setSelectedStaff(row);
                setShowModal(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                setStaffToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [staffs]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold mb-4">Manage Staff</h1>
        <Button
          onClick={() => {
            setSelectedStaff(null);
            setShowModal(true);
          }}
        >
          Add Staff
          <Plus className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <GlobalTable
        data={staffs}
        columns={columns}
        itemsPerPage={5}
        className="w-full"
      />

      <StaffModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedStaff}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Staff"
        message={`Are you sure you want to delete ${staffToDelete?.name}?`}
      />
    </div>
  );
};

export default AdminStaffsPage;
