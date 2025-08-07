"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import brandData from "@/data/Brands.json";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { BrandModal } from "@/components/Admin/Product/BrandModal";
import { DeleteModal } from "@/components/Global/DeleteModal";

const AdminBrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  useEffect(() => {
    setBrands(brandData);
  }, []);

  useEffect(() => {
    setFilteredBrands(
      brands.filter((brand) =>
        brand.bname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [brands, search]);

  const handleAddOrUpdate = (data) => {
    if (selectedBrand) {
      setBrands((prev) =>
        prev.map((b) => (b.id === selectedBrand.id ? { ...b, ...data } : b))
      );
    } else {
      const newBrand = {
        ...data,
        id: Date.now(),
      };
      setBrands((prev) => [...prev, newBrand]);
    }
    setSelectedBrand(null);
  };

  const handleDelete = () => {
    setBrands((prev) => prev.filter((b) => b.id !== brandToDelete.id));
    setBrandToDelete(null);
    setShowDelete(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredBrands.indexOf(row) + 1,
      },
      {
        header: "Image",
        accessorKey: "logo",
        cell: (value) => (
          <img
            src={value}
            alt="Brand Logo"
            className="h-12 w-12 rounded object-contain"
          />
        ),
      },
      {
        header: "Brand Name",
        accessorKey: "bname",
      },
      {
        header: "Top Brand",
        accessorKey: "top",
        cell: (value) => (value === "yes" ? "Yes" : "No"),
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8"
              onClick={() => {
                setSelectedBrand(row);
                setShowModal(true);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8"
              onClick={() => {
                setBrandToDelete(row);
                setShowDelete(true);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [filteredBrands]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Manage Brands</h1>
        <Button
          onClick={() => {
            setSelectedBrand(null);
            setShowModal(true);
          }}
        >
          Add Brand
          <Plus className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Search by brand name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border rounded px-4 py-2"
      />

      <GlobalTable
        data={filteredBrands}
        columns={columns}
        itemsPerPage={10}
        className="w-full"
      />

      <BrandModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedBrand}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Brand"
        message={`Are you sure you want to delete ${brandToDelete?.bname}?`}
      />
    </div>
  );
};

export default AdminBrandsPage;
