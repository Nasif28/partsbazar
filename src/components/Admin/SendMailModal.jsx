"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { Loading } from "../SVG/Loading";

export const SendMailModal = ({ open, onClose, count }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!subject) newErrors.subject = "Subject is required";
    if (!message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      onClose();
      alert(`Email sent successfully to ${count} subscribers!`);
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[calc(100vh-100px)]">
        <DialogHeader>
          <DialogTitle>Send Email to Subscribers</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-primary font-medium">
              This email will be sent to{" "}
              <span className="font-bold">{count}</span> active subscribers
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Subject *</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
                className={errors.subject ? "border-primary" : ""}
              />
              {errors.subject && (
                <p className="text-primary text-xs">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Message *</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={12}
                className={`max-h-80 overflow-y-auto ${errors.message ? "border-primary" : ""}`}
              />
              {errors.message && (
                <p className="text-primary text-xs">{errors.message}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSending}>
            {isSending ? (
              <>
                <Loading />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
