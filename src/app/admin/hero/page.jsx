"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cross, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { Space } from "@/components/Global/Space";
import { DeleteButton, EditButton } from "@/components/Global/ActionButtons";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { BannerModal } from "@/components/Admin/BannerModal";
import { Tag } from "@/components/Global/Tag";
import Image from "next/image";

const AdminHeroBannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setBanners([
      {
        id: 1,
        title: "Summer Sale",
        subtitle: "Up to 50% Off",
        image: "/b1.jpg",
        link: "/products",
        position: "homepage",
        status: "Active",
      },
      {
        id: 2,
        title: "Summer Sale",
        subtitle: "Up to 50% Off",
        image: "/b2.jpg",
        link: "/new-arrivals",
        position: "homepage",
        status: "Inactive",
      },
    ]);
  }, []);

  useEffect(() => {
    setFilteredBanners(
      banners.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.subtitle?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [banners, search]);

  const handleAddOrUpdate = (data) => {
    if (selectedBanner) {
      setBanners((prev) =>
        prev.map((b) => (b.id === selectedBanner.id ? { ...b, ...data } : b))
      );
    } else {
      const newBanner = {
        ...data,
        id: Date.now(),
      };
      setBanners((prev) => [...prev, newBanner]);
    }
    setSelectedBanner(null);
  };

  const handleDelete = () => {
    setBanners((prev) => prev.filter((b) => b.id !== bannerToDelete.id));
    setBannerToDelete(null);
    setShowDelete(false);
  };

  const handleImagePreview = (imageUrl) => {
    setImagePreview(imageUrl);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredBanners.indexOf(row) + 1,
      },
      {
        header: "Banner",
        accessorKey: "image",
        cell: (value) => (
          <div
            className="cursor-pointer"
            onClick={() => handleImagePreview(value)}
          >
            <Image
              src={value}
              alt="Banner"
              width={120}
              height={60}
              className="h-15 w-30 object-cover rounded border"
            />
          </div>
        ),
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Subtitle",
        accessorKey: "subtitle",
      },
      {
        header: "Link",
        accessorKey: "link",
        cell: (value) => (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {value}
          </a>
        ),
      },
      {
        header: "Position",
        accessorKey: "position",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <EditButton
              onClick={() => {
                setSelectedBanner(row);
                setShowModal(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                setBannerToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredBanners]
  );

  return (
    <div>
      {/* Header */}
      <AdminPageHeader
        title="Manage Hero Banners"
        actions={
          <>
            <Input
              type="text"
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
            <Button
              onClick={() => {
                setSelectedBanner(null);
                setShowModal(true);
              }}
            >
              Add Banner
              <Plus className="w-4 h-4" />
            </Button>
          </>
        }
      />

      <GlobalTable
        data={filteredBanners}
        columns={columns}
        itemsPerPage={10}
        className="w-full"
      />

      <BannerModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedBanner}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Banner"
        message={`Are you sure you want to delete ${bannerToDelete?.title}?`}
      />

      {/* Image Preview Modal */}
      {imagePreview && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setImagePreview(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={imagePreview}
              alt="Banner Preview"
              width={1900}
              height={600}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-primary bg-gray-300 rounded-full p-2"
              onClick={() => setImagePreview(null)}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeroBannerPage;
