"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed successfully!", {
      description: `You've been added to our newsletter (${email})`,
    });
    setEmail("");
  };

  return (
    <div className="bg-secondary rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Newsletter</h3>

      <p className="text-muted-foreground mb-5">
        Register now to get latest updates on promotions & coupons.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          className="flex-1 h-10 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" size="lg" className="shrink-0 rounded">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
