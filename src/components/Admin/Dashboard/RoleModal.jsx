"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

// Validation schema
const roleSchema = z.object({
  name: z
    .string()
    .min(2, "Role name must be at least 2 characters")
    .max(50, "Role name cannot exceed 50 characters")
    .refine((value) => /^[a-zA-Z0-9\s]+$/.test(value), {
      message: "Role name can only contain letters, numbers, and spaces",
    }),
  status: z.enum(["Active", "Inactive"]),
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
});

export const RoleModal = ({ open, onClose, onSubmit, initialData = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: initialData || {
      name: "",
      status: "Active",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        initialData || {
          name: "",
          status: "Active",
          description: "",
        }
      );
    }
  }, [open, initialData, reset]);

  const onSubmitHandler = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Role" : "Create New Role"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update role details"
              : "Define a new role with specific permissions"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          {/* Role Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Role Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Administrator, Manager"
              {...register("name")}
              error={errors.name?.message}
            />
            {errors.name && (
              <p className="text-sm text-primary">{errors.name.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              defaultValue={watch("status")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Brief description of this role's permissions"
              {...register("description")}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="flex justify-between">
              {errors.description ? (
                <p className="text-sm text-primary">
                  {errors.description.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {watch("description")?.length || 0}/200 characters
                </p>
              )}
            </div>
          </div>

          {/* Permissions Section */}
          <div className="space-y-4">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="view"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <Label htmlFor="view" className="text-sm font-medium">
                    View
                  </Label>
                </div>
                <p className="text-xs text-gray-500">View content and data</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="create"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <Label htmlFor="create" className="text-sm font-medium">
                    Create
                  </Label>
                </div>
                <p className="text-xs text-gray-500">Create new content</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <Label htmlFor="edit" className="text-sm font-medium">
                    Edit
                  </Label>
                </div>
                <p className="text-xs text-gray-500">Modify existing content</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="delete"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <Label htmlFor="delete" className="text-sm font-medium">
                    Delete
                  </Label>
                </div>
                <p className="text-xs text-gray-500">Remove content</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Role" : "Create Role"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
