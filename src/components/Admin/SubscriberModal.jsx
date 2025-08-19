"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SubscriberModal = ({ open, onClose, onSubmit, initialData }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setEmail(initialData.email || "");
      setStatus(initialData.status || "active");
    } else {
      resetForm();
    }
  }, [initialData, open]);

  const resetForm = () => {
    setEmail("");
    setStatus("active");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const subscriberData = {
      email,
      status,
    };

    onSubmit(subscriberData);
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Subscriber" : "Add New Subscriber"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              disabled={!!initialData}
              className={errors.email ? "border-primary" : ""}
            />
            {errors.email && (
              <p className="text-primary text-xs">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Status *</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary-dark"
          >
            {initialData ? "Update Subscriber" : "Add Subscriber"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
