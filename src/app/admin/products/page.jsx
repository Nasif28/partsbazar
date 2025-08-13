"use client";
import Link from "next/link";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "@/components/Global/ActionButtons";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Space } from "@/components/Global/Space";
import { Tag } from "@/components/Global/Tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";

const AdminProductsPage = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [search, setSearch] = useState("");

  // Mock product data
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "MOBIL DOT 4 BRAKE FLUID",
      brand: "MOBIL",
      category: "Brake Fluid",
      regularPrice: 50.0,
      discountPrice: 45.0,
      purchasePrice: 30.0,
      status: "Active",
      stock: 120,
      sold: 25,
      bestSelling: false,
      suggested: true,
      createdAt: "2023-09-22",
      thumbnail: "/products/brake-fluid.jpg",
    },
    {
      id: "2",
      name: "TOTOTA Brake Fluid DOT 3",
      brand: "TOTOTA",
      category: "Brake Fluid",
      regularPrice: 60.0,
      discountPrice: 55.0,
      purchasePrice: 35.0,
      status: "Active",
      stock: 85,
      sold: 42,
      bestSelling: true,
      suggested: false,
      createdAt: "2023-08-15",
      thumbnail: "/products/totota-brake.jpg",
    },
    {
      id: "3",
      name: "Engine Oil 5W-30",
      brand: "CASTROL",
      category: "Engine Oil",
      regularPrice: 80.0,
      discountPrice: 75.0,
      purchasePrice: 50.0,
      status: "Active",
      stock: 200,
      sold: 120,
      bestSelling: true,
      suggested: true,
      createdAt: "2023-07-10",
      thumbnail: "/products/engine-oil.jpg",
    },
    {
      id: "4",
      name: "Air Filter Premium",
      brand: "BOSCH",
      category: "Filters",
      regularPrice: 35.0,
      discountPrice: 30.0,
      purchasePrice: 15.0,
      status: "Inactive",
      stock: 0,
      sold: 85,
      bestSelling: false,
      suggested: false,
      createdAt: "2023-06-05",
      thumbnail: "/products/air-filter.jpg",
    },
  ]);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    setProductToDelete(null);
    setShowDelete(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredProducts.indexOf(row) + 1,
      },
      {
        header: "Thumbnail",
        accessorKey: "thumbnail",
        cell: (value) => (
          <img
            src={value}
            alt="Product"
            className="h-16 w-16 rounded object-cover"
          />
        ),
      },
      {
        header: "Product",
        accessorKey: "name",
        cell: (value, row) => (
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">
              Brand: {row.brand}
            </div>
          </div>
        ),
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Pricing",
        accessorKey: "pricing",
        cell: (_, row) => (
          <div>
            <div className="line-through text-muted-foreground">
              ${row.regularPrice.toFixed(2)}
            </div>
            <div className="font-medium">
              ${row.discountPrice?.toFixed(2) || row.regularPrice.toFixed(2)}
            </div>
          </div>
        ),
      },
      {
        header: "Stock",
        accessorKey: "stock",
        cell: (value) => (
          <div className={value > 0 ? "text-foreground" : "text-primary"}>
            {value > 0 ? `${value} in stock` : "Out of stock"}
          </div>
        ),
      },
      {
        header: "Sold",
        accessorKey: "sold",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Flags",
        accessorKey: "flags",
        cell: (_, row) => (
          <div className="flex gap-2">
            {row.bestSelling && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                Best
              </span>
            )}
            {row.suggested && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                Suggested
              </span>
            )}
          </div>
        ),
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <Link href={`/admin/products/${row.id}`}>
              <ViewButton />
            </Link>

            <Link href={`/admin/products/edit/${row.id}`}>
              <EditButton />
            </Link>

            <DeleteButton
              onClick={() => {
                setProductToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredProducts]
  );

  return (
    <div>
      {/* Header  */}
      <AdminPageHeader
        title="Product List"
        subtitle="Manage all products in your inventory"
        actions={
          <>
            <Input
              type="text"
              placeholder="Search by product name, brand or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
            <Link href="/admin/products/add">
              <Button>
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </Link>
          </>
        }
      />

      {/* <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Product List</h1>
          <p className="text-muted-foreground">
            Manage all products in your inventory
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Search by product name, brand or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80"
          />
          <Link href="/admin/products/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div> */}

      <div>
        <GlobalTable
          data={filteredProducts}
          columns={columns}
          itemsPerPage={5}
        />
      </div>

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"?`}
      />
    </div>
  );
};

export default AdminProductsPage;
