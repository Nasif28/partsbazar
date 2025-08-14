"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Space } from "@/components/Global/Space";
import { DeleteButton, EditButton } from "@/components/Global/ActionButtons";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { TestimonialModal } from "@/components/Admin/User/TestimonialModal";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { Tag } from "@/components/Global/Tag";
import Image from "next/image";

const testimonialData = [
  {
    id: "1",
    author: "Customo Alfred",
    designation: "Bnil E ampex V",
    content: "This product changed my life! Highly recommended.",
    rating: 5,
    status: "Active",
    image: "/images/user1.jpg",
  },
  {
    id: "2",
    author: "Jett Dunlap",
    designation: "Ting Yhajepaini",
    content: "Excellent service and quality products.",
    rating: 4,
    status: "Active",
    image: "/images/user2.jpg",
  },
  {
    id: "3",
    author: "Joana Paschall",
    designation: "Be hx V",
    content: "Could be better, but overall satisfied.",
    rating: 3,
    status: "Inactive",
    image: "/images/user3.jpg",
  },
  {
    id: "4",
    author: "Manual Tingdel",
    designation: "Xissa Ivrypo e",
    content: "Not what I expected. Needs improvement.",
    rating: 2,
    status: "Inactive",
    image: "/images/user4.jpg",
  },
];

const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  useEffect(() => {
    setTestimonials(testimonialData);
  }, []);

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((testimonial) => {
      const searchTerm = search.toLowerCase();
      return (
        testimonial.author.toLowerCase().includes(searchTerm) ||
        testimonial.designation.toLowerCase().includes(searchTerm)
      );
    });
  }, [testimonials, search]);

  const handleAddOrUpdate = (data) => {
    if (selectedTestimonial) {
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === selectedTestimonial.id ? { ...t, ...data } : t
        )
      );
    } else {
      const newTestimonial = {
        ...data,
        id: Date.now().toString(),
      };
      setTestimonials((prev) => [...prev, newTestimonial]);
    }
    setSelectedTestimonial(null);
  };

  const handleDelete = () => {
    setTestimonials((prev) =>
      prev.filter((t) => t.id !== testimonialToDelete.id)
    );
    setTestimonialToDelete(null);
    setShowDelete(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredTestimonials.indexOf(row) + 1,
      },
      {
        header: "Author",
        accessorKey: "author",
        cell: (value, row) => (
          <div className="flex items-center gap-3">
            <Image
              src={row.image}
              alt={row.author}
              height={100}
              width={100}
              className="w-10 h-10 rounded object-cover"
            />
            <span>{value}</span>
          </div>
        ),
      },
      {
        header: "Designation",
        accessorKey: "designation",
      },
      {
        header: "Rating",
        accessorKey: "rating",
        cell: (value) => (
          <div className="flex items-center">
            <span className="mr-1 text-xs text-yellow-600 font-bold">
              {value}
            </span>
            <Star className="w-3 h-3 mb-0.5 text-yellow-600 fill-yellow-500" />
          </div>
        ),
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
                setSelectedTestimonial(row);
                setShowModal(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                setTestimonialToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredTestimonials]
  );

  return (
    <div>
      {/* Header */}
      <AdminPageHeader
        title="Testimonials"
        actions={
          <>
            <Input
              type="text"
              placeholder={`Search by author or designation...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
            <Button
              onClick={() => {
                setSelectedTestimonial(null);
                setShowModal(true);
              }}
              className="w-full md:w-auto"
            >
              Create Testimonial
              <Plus className="w-4 h-4" />
            </Button>
          </>
        }
      />

      <GlobalTable
        data={filteredTestimonials}
        columns={columns}
        itemsPerPage={10}
        className="w-full"
      />

      <TestimonialModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedTestimonial}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete ${testimonialToDelete?.author}'s testimonial?`}
      />
    </div>
  );
};

export default AdminTestimonialsPage;
