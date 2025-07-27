"use client";
import PageHeader from "@/components/Global/PageHeader";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import { CalendarIcon, Clipboard, Loader, SendHorizonal } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Label } from "@/components/ui/Label";

// Form schema validation
const formSchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  customerName: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  vehicleRegNumber: z.string().optional(),
  chassisNumber: z.string().min(5, {
    message: "Chassis number must be at least 5 characters.",
  }),
  carBrand: z.string().min(2, {
    message: "Car brand is required",
  }),
  carModel: z.string().min(2, {
    message: "Car model is required",
  }),
  manufacturerYear: z
    .string()
    .min(4, {
      message: "Manufacturer year must be 4 digits",
    })
    .max(4, {
      message: "Manufacturer year must be 4 digits",
    }),
  engineNumber: z.string().min(3, {
    message: "Engine number is required",
  }),
  partNumber: z.string().optional(),
  contactNumber: z.string().min(8, {
    message: "Contact number must be at least 8 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  note: z.string().optional(),
});

const RequestPartsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      vehicleRegNumber: "",
      chassisNumber: "",
      carBrand: "",
      carModel: "",
      manufacturerYear: "",
      engineNumber: "",
      partNumber: "",
      contactNumber: "",
      email: "",
      note: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formattedDate = format(data.date, "yyyy-MM-dd");
      const requestData = { ...data, date: formattedDate };
      const response = await submitPartsRequest(requestData);
      toast.success("Your parts request has been received successfully.");
      form.reset();
    } catch (error) {
      toast(
        `${error.message || "Failed to submit your request. Please try again."}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Auto Parts Request"
        description="Get genuine parts for your vehicle"
      />

      <div className="max-w-4xl mx-auto py-6">
        <Card>
          <CardHeader className=" border-b border-border">
            <CardTitle className="text-2xl font-bold flex items-center">
              <span className="bg-primary/10 text-primary p-2 rounded-lg mr-3">
                <Clipboard />
              </span>
              Auto Parts Request Form
            </CardTitle>

            <CardDescription className="text-muted-foreground mt-2">
              Fill out the form below to request parts. Fields marked with{" "}
              <span className="text-red-500">*</span> are required.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Date <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch("date") ? (
                          format(form.watch("date"), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={form.watch("date")}
                        onSelect={(date) => form.setValue("date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.date && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.date.message}
                    </p>
                  )}
                </div>

                {/* Customer Name */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Customer Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register("customerName")}
                    placeholder="John Doe"
                    className="w-full"
                  />
                  {form.formState.errors.customerName && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.customerName.message}
                    </p>
                  )}
                </div>

                {/* Vehicle Registration Number */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Vehicle Registration Number
                  </Label>
                  <Input
                    {...form.register("vehicleRegNumber")}
                    placeholder="ABC-1234"
                    className="w-full"
                  />
                </div>

                {/* Chassis Number */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Chassis Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register("chassisNumber")}
                    placeholder="e.g., JTDKB20U677678905"
                    className="w-full"
                  />
                  {form.formState.errors.chassisNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.chassisNumber.message}
                    </p>
                  )}
                </div>

                {/* Car Brand */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Car Brand <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register("carBrand")}
                    placeholder="e.g., Toyota"
                    className="w-full"
                  />
                  {form.formState.errors.carBrand && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.carBrand.message}
                    </p>
                  )}
                </div>

                {/* Car Model */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Car Model <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register("carModel")}
                    placeholder="e.g., Camry"
                    className="w-full"
                  />
                  {form.formState.errors.carModel && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.carModel.message}
                    </p>
                  )}
                </div>

                {/* Manufacturer Year */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Manufacturer Year <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register("manufacturerYear")}
                    placeholder="e.g., 2020"
                    className="w-full"
                  />
                  {form.formState.errors.manufacturerYear && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.manufacturerYear.message}
                    </p>
                  )}
                </div>

                {/* Engine Number */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Engine Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register("engineNumber")}
                    placeholder="e.g., 2AZ1234567"
                    className="w-full"
                  />
                  {form.formState.errors.engineNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.engineNumber.message}
                    </p>
                  )}
                </div>

                {/* Part Number */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Part Number
                  </Label>
                  <Input
                    {...form.register("partNumber")}
                    placeholder="e.g., 12345-67890"
                    className="w-full"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register("contactNumber")}
                    placeholder="e.g., +1 (555) 123-4567"
                    className="w-full"
                  />
                  {form.formState.errors.contactNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.contactNumber.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label className="block text-sm font-medium  mb-1">
                    E-mail <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register("email")}
                    placeholder="your.email@example.com"
                    className="w-full"
                    type="email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* Note */}
                <div className="md:col-span-2">
                  <Label className="block text-sm font-medium  mb-1">
                    Note
                  </Label>
                  <Textarea
                    {...form.register("note")}
                    placeholder="Additional information about your request..."
                    className="w-full min-h-[120px]"
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              className="px-8 py-6 text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Submit Request
                  <SendHorizonal />
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RequestPartsPage;
