"use client";
import { useMemo } from "react";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const products = [
    { id: "1", name: "Laptop", price: 999, stock: 15, category: "Electronics" },
    { id: "2", name: "Chair", price: 199, stock: 30, category: "Furniture" },
    {
      id: "3",
      name: "Smartphone",
      price: 699,
      stock: 5,
      category: "Electronics",
    },
    { id: "4", name: "Desk", price: 299, stock: 10, category: "Furniture" },
    {
      id: "5",
      name: "Headphones",
      price: 89,
      stock: 50,
      category: "Electronics",
    },
    {
      id: "6",
      name: "Monitor",
      price: 249,
      stock: 20,
      category: "Electronics",
    },
    { id: "7", name: "Sofa", price: 799, stock: 8, category: "Furniture" },
    {
      id: "8",
      name: "Coffee Table",
      price: 149,
      stock: 25,
      category: "Furniture",
    },
    {
      id: "9",
      name: "Keyboard",
      price: 49,
      stock: 100,
      category: "Electronics",
    },
    { id: "10", name: "Mouse", price: 29, stock: 120, category: "Electronics" },
  ];

  const columns = useMemo(
    () => [
      { header: "Name", accessorKey: "name" },
      {
        header: "Price",
        accessorKey: "price",
        cell: (value) => `$${value.toFixed(2)}`,
      },
      {
        header: "Stock",
        accessorKey: "stock",
        cell: (value, row) => (
          <span className={value < 10 ? "text-red-500 font-medium" : ""}>
            {value} {value < 10 && "(Low Stock)"}
          </span>
        ),
      },
      { header: "Category", accessorKey: "category" },
      {
        header: "Actions",
        cell: () => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8"
              onClick={() => console.log("Editing:")}
            >
              <Edit />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8"
              onClick={() => console.log("Editing:")}
            >
              <Trash />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      <GlobalTable
        data={products}
        columns={columns}
        itemsPerPage={5}
        className="w-full"
      />
    </div>
  );
}
