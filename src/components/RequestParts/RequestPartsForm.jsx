"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitPartsRequest } from "@/lib/api";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";



const PartsRequestForm = () => {
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
      // Format date to YYYY-MM-DD
      const formattedDate = format(data.date, "yyyy-MM-dd");
      const requestData = { ...data, date: formattedDate };

      // Submit data to API
      const response = await submitPartsRequest(requestData);

      toast.success("Your parts request has been received successfully.");

      // Reset form
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
   
  );
};

export default PartsRequestForm;
