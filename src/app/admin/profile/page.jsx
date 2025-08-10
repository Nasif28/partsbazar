"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  PencilIcon,
  EyeIcon,
  EyeOffIcon,
  SaveIcon,
  XIcon,
  KeyIcon,
  UserIcon,
  LockIcon,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// Form validation schemas
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bio: z.string().optional(),
  notifications: z.boolean(),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock admin data
  const [adminData, setAdminData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Senior administrator with 5+ years of experience managing e-commerce platforms.",
    avatar: "",
    role: "Super Admin",
    joined: "Jan 15, 2022",
    notifications: true,
    twoFactor: true,
  });

  // Initialize forms
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: adminData,
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle profile form submission
  const onProfileSubmit = (data) => {
    setAdminData({ ...adminData, ...data });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  // Handle password form submission
  const onPasswordSubmit = (data) => {
    passwordForm.reset();
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and update your personal information
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4">
          <Card className="">
            <CardHeader className="flex flex-col items-center pt-6 pb-4">
              <Avatar className="w-24 h-24 border-4 border-border shadow-lg">
                <AvatarImage src={adminData.avatar} alt={adminData.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                  {adminData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="mt-4 text-center">
                <CardTitle className="text-xl font-bold">
                  {adminData.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  {adminData.role}
                </CardDescription>
                <div className="mt-2 text-sm text-muted-foreground">
                  Member since {adminData.joined}
                </div>
              </div>
            </CardHeader>

            <div className="px-4 py-3 bg-muted border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">
                  Two-Factor Authentication
                </div>
                <Switch
                  checked={adminData.twoFactor}
                  onCheckedChange={(checked) =>
                    setAdminData({ ...adminData, twoFactor: checked })
                  }
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-3/4">
          <div className="mb-6 bg-card rounded-xl border-border border shadow-sm overflow-hidden">
            <nav className="flex">
              <button
                className={`flex items-center px-5 py-4 text-sm font-medium ${
                  activeTab === "profile"
                    ? "bg-primary/10 text-primary border-l-4 border-primary-dark font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <UserIcon className="w-4 h-4 mr-3" />
                Profile Information
              </button>
              <button
                className={`flex items-center px-5 py-4 text-sm font-medium ${
                  activeTab === "password"
                    ? "bg-primary/10 text-primary border-l-4 border-primary-dark font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10 "
                }`}
                onClick={() => setActiveTab("password")}
              >
                <KeyIcon className="w-4 h-4 mr-3" />
                Change Password
              </button>
              <button
                className={`flex items-center px-5 py-4 text-sm font-medium ${
                  activeTab === "security"
                    ? "bg-primary/10 text-primary border-l-4 border-primary-dark font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
                onClick={() => setActiveTab("security")}
              >
                <LockIcon className="w-4 h-4 mr-3" />
                Security Settings
              </button>
            </nav>
          </div>

          {activeTab === "profile" && (
            <Card className="bg-card rounded-xl shadow-sm">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(true);
                        profileForm.reset(adminData);
                      }}
                    >
                      <PencilIcon className="w-4 h-4 mr-1" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        <XIcon className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        onClick={profileForm.handleSubmit(onProfileSubmit)}
                      >
                        <SaveIcon className="w-4 h-4 mr-1" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                {!isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </h3>
                        <p className="mt-1">{adminData.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Email
                        </h3>
                        <p className="mt-1">{adminData.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Phone
                        </h3>
                        <p className="mt-1">{adminData.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Notifications
                        </h3>
                        <p className="mt-1">
                          {adminData.notifications ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Bio
                      </h3>
                      <p className="mt-1">{adminData.bio}</p>
                    </div>
                  </div>
                ) : (
                  <Form {...profileForm}>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your phone number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="notifications"
                          render={({ field }) => (
                            <FormItem className="flex justify-between">
                              <div className="space-y-0.5">
                                <FormLabel>Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive email notifications about account
                                  activities
                                </FormDescription>
                              </div>
                              <FormControl>
                                <div className="mt-3">
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tell us about yourself"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "password" && (
            <Card>
              <CardHeader className="border-b">
                <div>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your account password for enhanced security
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 cursor-pointer flex items-center text-muted-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                  <EyeIcon className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4 border-2 border-border">
                      <h3 className="text-sm font-medium text-primary-dark mb-2">
                        Password Requirements
                      </h3>
                      <ul className="text-xs text-primary">
                        <li className="flex items-start">
                          <div className="w-5 h-5 mr-1 text-primary">✓</div>
                          Minimum 8 characters
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 mr-1 text-primary">✓</div>
                          At least one uppercase letter
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 mr-1 text-primary">✓</div>
                          At least one number or special character
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">
                        <SaveIcon className="w-4 h-4 mr-1" />
                        Update Password
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader className="border-b">
                <div>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security preferences
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex justify-between items-center p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={adminData.twoFactor}
                    onCheckedChange={(checked) =>
                      setAdminData({ ...adminData, twoFactor: checked })
                    }
                  />
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Login Notifications</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified when someone logs into your account
                    </p>
                  </div>
                  <Switch
                    checked={adminData.notifications}
                    onCheckedChange={(checked) =>
                      setAdminData({ ...adminData, notifications: checked })
                    }
                  />
                </div>

                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium">Active Sessions</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    This is a list of devices that have logged into your
                    account.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-muted p-2 rounded-lg">
                          <Monitor className="text-muted-foreground"/>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">MacBook Pro</p>
                          <p className="text-sm text-muted-foreground">
                            Safari • New York, USA
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Now</div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-muted p-2 rounded-lg">
                         <Smartphone className="text-muted-foreground"/>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">iPhone 13 Pro</p>
                          <p className="text-sm text-muted-foreground">
                            Chrome • Los Angeles, USA
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
