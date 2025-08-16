"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const FAQModal = ({ open, onClose, onSubmit, initialData }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [rank, setRank] = useState(1);
  const [top, setTop] = useState(false);
  const [status, setStatus] = useState("Active");
  const [keywords, setKeywords] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const categories = [
    "General",
    "Delivery",
    "Payment",
    "Returns",
    "Products",
    "Account",
    "Technical",
  ];

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question || "");
      setAnswer(initialData.answer || "");
      setCategory(initialData.category || "General");
      setRank(initialData.rank || 1);
      setTop(initialData.top || false);
      setStatus(initialData.status || "Active");
      setKeywords(initialData.keywords?.join(", ") || "");
    } else {
      resetForm();
    }
  }, [initialData, open]);

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setCategory("General");
    setRank(1);
    setTop(false);
    setStatus("Active");
    setKeywords("");
    setCustomCategory("");
  };

  const handleSubmit = () => {
    if (!question || !answer) return;

    const faqData = {
      question,
      answer,
      category: category === "custom" ? customCategory : category,
      rank,
      top,
      status,
      keywords: keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k),
    };

    onSubmit(faqData);
    onClose();
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit FAQ" : "Create New FAQ"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Question *</Label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What customers frequently ask?"
            />
          </div>

          <div className="space-y-2">
            <Label>Answer *</Label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide a clear and concise answer"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Custom Category</SelectItem>
                </SelectContent>
              </Select>

              {category === "custom" && (
                <Input
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category"
                  className="mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Rank</Label>
              <Select
                value={rank.toString()}
                onValueChange={(v) => setRank(parseInt(v))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select rank" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} (Higher = top)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="space-y-4">
              <Label>Featured FAQ</Label>
              <div className="flex items-center gap-2">
                <Switch checked={top} onCheckedChange={setTop} id="top-faq" />
                <Label htmlFor="top-faq">
                  {top ? "Featured" : "Not Featured"}
                </Label>
              </div>
              <p className="text-xs text-gray-500">Show in top FAQs section</p>
            </div>

            <div className="space-y-2 flex-1">
              <Label>Keywords</Label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Comma separated keywords (e.g., delivery, shipping)"
              />
              <p className="text-xs text-gray-500">
                Helps customers find this FAQ through search
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Update FAQ" : "Create FAQ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
