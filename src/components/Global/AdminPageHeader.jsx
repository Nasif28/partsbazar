"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function AdminPageHeader({ title, subtitle, actions, className }) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4",
        className
      )}
    >
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </div>
  );
}
