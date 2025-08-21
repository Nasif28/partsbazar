"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setCategory,
  selectFAQCategories,
  selectFAQSearchTerm,
  selectFAQSelectedCategory,
} from "@/redux/features/faqSlice";

export default function FAQFilter() {
  const dispatch = useDispatch();
  const categories = useSelector(selectFAQCategories);
  const searchTerm = useSelector(selectFAQSearchTerm);
  const selectedCategory = useSelector(selectFAQSelectedCategory);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (value) => {
    dispatch(setCategory(value));
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            className="pl-10 py-5"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:bg-transparent"
              onClick={() => dispatch(setSearchTerm(""))}
            >
              <X size={16} />
            </Button>
          )}
        </div>

        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="py-5 gap-2">
            <Filter className="h-4 w-4" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>

          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
