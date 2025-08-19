import * as React from "react";
import { cn } from "@/lib/utils";

export const Loading = ({
  size = 18,
  strokeWidth = 2,
  className,
  "aria-label": ariaLabel = "Loading",
}) => {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center", className)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r={radius}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth={strokeWidth}
        />

        <circle
          cx="12"
          cy="12"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={`${circumference * 0.75}`}
        />
      </svg>
    </span>
  );
};
