"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import categoriesData from "@/data/Categories.json";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { DeleteModal } from "@/components/Global/DeleteModal";
import CategoryModal from "@/components/Admin/Product/CategoryModal";
import { Space } from "@/components/Global/Space";
import { DeleteButton, EditButton } from "@/components/Global/ActionButtons";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  console.log(categoriesData);
  useEffect(() => {
    setCategories(categoriesData.categories);
  }, []);
  console.log(categories);
  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [categories, search]);

  const handleAddOrUpdate = (data) => {
    if (selectedCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === selectedCategory.id ? { ...c, ...data } : c))
      );
    } else {
      const newCategory = {
        ...data,
        id: Date.now(),
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    setSelectedCategory(null);
  };

  const handleDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
    setCategoryToDelete(null);
    setShowDelete(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredCategories.indexOf(row) + 1,
      },
      {
        header: "Image",
        accessorKey: "image",
        cell: (value) => (
          <img
            src={value}
            alt="Category Image"
            className="h-12 w-12 rounded object-contain"
          />
        ),
      },
      {
        header: "Category Name",
        accessorKey: "name",
      },
      {
        header: "Top Category",
        accessorKey: "isTop",
        cell: (value) => (value ? "Yes" : "No"),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (value) =>
          value.toLowerCase() === "active" ? "Active" : "Inactive",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <EditButton
              onClick={() => {
                setSelectedCategory(row);
                setShowModal(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                setCategoryToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredCategories]
  );

  return (
    <div>
      {/* Header  */}
      <AdminPageHeader
        title="Manage Categories"
        actions={
          <>
            <Input
              type="text"
              placeholder="Search by category name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
            <Button
              onClick={() => {
                setSelectedCategory(null);
                setShowModal(true);
              }}
            >
              Add Category
              <Plus className="w-4 h-4" />
            </Button>
          </>
        }
      />

      <GlobalTable
        data={filteredCategories}
        columns={columns}
        itemsPerPage={10}
        className="w-full"
      />

      {/* <CategoryModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedCategory}
      /> */}

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete ${categoryToDelete?.name}?`}
      />
    </div>
  );
};

export default AdminCategoriesPage;
