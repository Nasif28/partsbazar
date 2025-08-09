import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export function EditButton({ onClick }) {
  return (
    <Button variant="outline" size="icon" onClick={onClick}>
      <Edit className="w-4 h-4" />
    </Button>
  );
}

export function DeleteButton({ onClick }) {
  return (
    <Button variant="outline" size="icon" onClick={onClick}>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
