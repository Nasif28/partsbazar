"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export const StaffModal = ({ open, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "Active",
    photo: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        status: "Active",
        photo: "",
      });
  }, [initialData, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Staff" : "Add Staff"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            placeholder="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
          <Input
            placeholder="Photo URL"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
          />
          <Input
            placeholder="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Update" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
