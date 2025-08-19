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
import { Globe } from "lucide-react";

export const AddVisitorModal = ({ open, onClose, onSubmit, initialData }) => {
  const [ip, setIp] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setIp(initialData.ip || "");
    } else {
      resetForm();
    }
  }, [initialData, open]);

  const resetForm = () => {
    setIp("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!ip) newErrors.ip = "IP address is required";
    else if (
      !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ip
      )
    ) {
      newErrors.ip = "Invalid IP address format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const visitorData = {
      ip,
      blocked: false,
    };

    onSubmit(visitorData);
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Update Visitor" : "Add New Visitor"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>IP Address *</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Enter IP address (e.g., 192.168.1.1)"
                className={`pl-9 ${errors.ip ? "border-primary" : ""}`}
              />
            </div>
            {errors.ip && <p className="text-primary text-xs">{errors.ip}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Enter a valid IPv4 address format
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Update Visitor" : "Add Visitor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
