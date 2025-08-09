import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Printer, Info, BookText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function IconButton({ icon: Icon, defaultLabel, tooltip, onClick }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={onClick}>
            <Icon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip || defaultLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function EditButton({ onClick, tooltip }) {
  return (
    <IconButton
      icon={Edit}
      defaultLabel="Edit"
      tooltip={tooltip}
      onClick={onClick}
    />
  );
}

export function DeleteButton({ onClick, tooltip }) {
  return (
    <IconButton
      icon={Trash2}
      defaultLabel="Delete"
      tooltip={tooltip}
      onClick={onClick}
    />
  );
}

export function ViewButton({ onClick, tooltip }) {
  return (
    <IconButton
      icon={Eye}
      defaultLabel="View"
      tooltip={tooltip}
      onClick={onClick}
    />
  );
}

export function PrintButton({ onClick, tooltip }) {
  return (
    <IconButton
      icon={Printer}
      defaultLabel="Print"
      tooltip={tooltip}
      onClick={onClick}
    />
  );
}

export function DetailsButton({ onClick, tooltip }) {
  return (
    <IconButton
      icon={BookText}
      defaultLabel="Details"
      tooltip={tooltip}
      onClick={onClick}
    />
  );
}
