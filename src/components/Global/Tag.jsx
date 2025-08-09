import React from "react";

export function Tag({ status }) {
  const statusStyles = {
    Paid: "bg-green-100 text-green-800",
    Unpaid: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Placed: "bg-lime-100 text-lime-800",
    Delivered: "bg-green-100 text-green-800",
    Confirmed: "bg-blue-100 text-blue-800",
    Processing: "bg-purple-100 text-purple-800",
    Shipped: "bg-cyan-100 text-cyan-800",
    Canceled: "bg-gray-100 text-gray-800",
    Return: "bg-orange-100 text-orange-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
