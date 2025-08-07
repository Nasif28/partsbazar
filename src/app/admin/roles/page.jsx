"use client";

import { RoleModal } from "@/components/Admin/Dashboard/RoleModal";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";

const AdminRolesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [roles, setRoles] = useState([
    {
      id: "1",
      name: "SuperAdmin",
      status: "Active",
      createdAt: "2023-01-01",
      createdby: "Ibrahim",
    },
    {
      id: "2",
      name: "Admin",
      status: "Inactive",
      createdAt: "2023-01-02",
      createdby: "Ibrahim",
    },
    {
      id: "3",
      name: "Manager",
      status: "Active",
      createdAt: "2023-01-02",
      createdby: "Ibrahim",
    },
  ]);

  const handleAddOrUpdate = (data) => {
    if (selectedRole) {
      // update
      setRoles((prev) =>
        prev.map((s) => (s.id === selectedRole.id ? { ...s, ...data } : s))
      );
    } else {
      // create
      const newRole = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        createdby: "Admin",
      };
      setRoles((prev) => [...prev, newRole]);
    }
    setSelectedRole(null);
  };

  const handleDelete = () => {
    setRoles((prev) => prev.filter((s) => s.id !== roleToDelete.id));
    setRoleToDelete(null);
    setShowDelete(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => roles.indexOf(row) + 1,
      },
      { header: "Role Name", accessorKey: "name" },
      { header: "Status", accessorKey: "status" },
      { header: "Created At", accessorKey: "createdAt" },
      { header: "Created By", accessorKey: "createdby" },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSelectedRole(row);
                setShowModal(true);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setRoleToDelete(row);
                setShowDelete(true);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [roles]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold mb-4">Manage Role</h1>
        <Button
          onClick={() => {
            setSelectedRole(null);
            setShowModal(true);
          }}
        >
          Add Role
          <Plus className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <GlobalTable
        data={roles}
        columns={columns}
        itemsPerPage={5}
        className="w-full"
      />

      <RoleModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedRole}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Role"
        message={`Are you sure you want to delete ${roleToDelete?.name}?`}
      />
    </div>
  );
};

export default AdminRolesPage;
