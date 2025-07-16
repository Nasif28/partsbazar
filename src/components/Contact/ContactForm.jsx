"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Notebook,
  NotebookText,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form data:", data);
      toast.success("Thank you for your message! We'll get back to you soon.");
      setSubmitSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold mb-6">How Can We Assist You?</h3>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2 mb-2">
            <User size={16} />
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name", { required: "Name is required" })}
            className="py-6"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail size={16} />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="py-6"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
              <Phone size={16} />
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="+880 1712 345678"
              {...register("phone")}
              className="py-6"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="subject" className="flex items-center gap-2 mb-2">
            <NotebookText size={16} />
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="How can we help?"
            {...register("subject", { required: "Subject is required" })}
            className="py-6"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="message" className="flex items-center gap-2 mb-2">
            <MessageSquare size={16} />
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us about your inquiry..."
            rows={10}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 20,
                message: "Message must be at least 20 characters",
              },
            })}
            className="min-h-[120px] py-4"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
