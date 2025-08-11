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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

// Validation schema
const staffSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    phone: z
      .string()
      .min(11, "Phone number must be at least 11 digits")
      .regex(
        /^(?:\+?88)?01[3-9]\d{8}$/,
        "Must be a valid Bangladeshi phone number"
      ),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional(),
    address: z
      .string()
      .min(10, "Address must be at least 10 characters")
      .max(200, "Address cannot exceed 200 characters"),
    role: z.enum(["Admin", "Manager", "Support", "Editor", "Viewer"]),
    status: z.enum(["Active", "Inactive"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const StaffModal = ({ open, onClose, onSubmit, initialData = null }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: initialData || {
      name: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      role: "Support",
      status: "Active",
      photo: "",
    },
  });

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImagePreview("");
    setImageFile(null);
    setValue("photo", "");
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      reset(
        initialData || {
          name: "",
          username: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          role: "Support",
          status: "Active",
          photo: "",
        }
      );

      if (initialData?.photo) {
        setImagePreview(initialData.photo);
      } else {
        setImagePreview("");
        setImageFile(null);
      }
    }
  }, [open, initialData, reset]);

  // Submit handler
  const onSubmitHandler = (data) => {
    // For edit mode, if password is empty, remove it from the data
    if (initialData && !data.password) {
      delete data.password;
      delete data.confirmPassword;
    }

    onSubmit({
      ...data,
      photo: imagePreview || initialData?.photo || "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Staff Member" : "Add New Staff Member"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update staff member details"
              : "Add a new staff member to your team"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-1 right-0 bg-primary rounded-full p-1"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ) : (
                <div className="bg-muted border-2 border-dashed rounded-full w-20 h-20 flex items-center justify-center">
                  <span className="text-muted-foreground text-2xl">+</span>
                </div>
              )}

              <div>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Label
                  htmlFor="photo"
                  className="cursor-pointer border border-input rounded-md px-4 py-2 hover:bg-accent"
                >
                  Choose Image
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, or GIF. Max 2MB.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                error={errors.name?.message}
              />
              {errors.name && (
                <p className="text-sm text-primary">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                placeholder="johndoe"
                {...register("username")}
                error={errors.username?.message}
              />
              {errors.username && (
                <p className="text-sm text-primary">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="01XXXXXXXXX"
                {...register("phone")}
                error={errors.phone?.message}
              />
              {errors.phone && (
                <p className="text-sm text-primary">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                placeholder="john@example.com"
                {...register("email")}
                error={errors.email?.message}
              />
              {errors.email && (
                <p className="text-sm text-primary">{errors.email.message}</p>
              )}
            </div>

            {/* Password - Only show for new staff */}
            {!initialData && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password")}
                      error={errors.password?.message}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-primary">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                      error={errors.confirmPassword?.message}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-primary">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                onValueChange={(value) => setValue("role", value)}
                defaultValue={watch("role")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-primary">{errors.role.message}</p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                onValueChange={(value) => setValue("status", value)}
                defaultValue={watch("status")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-primary">{errors.status.message}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              placeholder="123 Main St, Dhaka, Bangladesh"
              {...register("address")}
              className="min-h-[100px]"
              error={errors.address?.message}
            />
            <div className="flex justify-between">
              {errors.address ? (
                <p className="text-sm text-primary">{errors.address.message}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {watch("address")?.length || 0}/200 characters
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Staff" : "Create Staff"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
