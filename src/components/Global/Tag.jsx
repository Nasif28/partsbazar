import React from "react";

export function Tag({ status }) {
  if (!status) return null;

  // Normalize status to lowercase for case-insensitive matching
  const normalizedStatus = status.toLowerCase();

  const statusStyles = {
    new: "bg-green-100 text-green-800",
    paid: "bg-green-100 text-green-800",
    unpaid: "bg-red-100 text-red-800",
    rejected: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
    placed: "bg-lime-100 text-lime-800",
    delivered: "bg-green-100 text-green-800",
    approved: "bg-green-100 text-green-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-cyan-100 text-cyan-800",
    canceled: "bg-gray-100 text-gray-800",
    return: "bg-orange-100 text-orange-800",
    active: "bg-emerald-100 text-emerald-800",
    inactive: "bg-red-100 text-red-800",
    yes: "bg-emerald-100 text-emerald-800",
    no: "bg-red-100 text-red-800",
  };

  // Find matching style regardless of case
  const styleKey = Object.keys(statusStyles).find(
    (key) => key.toLowerCase() === normalizedStatus
  );

  // Use matched style or fallback to default
  const styleClass = styleKey
    ? statusStyles[styleKey]
    : "bg-gray-100 text-gray-800";

  // Display original status value with proper styling
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${styleClass}`}>
      {status}
    </span>
  );
}
