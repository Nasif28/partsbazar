"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { Space } from "@/components/Global/Space";
import { DeleteButton, EditButton } from "@/components/Global/ActionButtons";
import { FAQModal } from "@/components/Admin/Frontend/FAQModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag } from "@/components/Global/Tag";

const initialFAQs = [
  {
    id: "faq-001",
    question: "What courier do you use?",
    answer:
      "We use our own mail, Pathao, and Paperfly to deliver orders inside Dhaka. For outside Dhaka metro areas, we use Pathao.",
    category: "Delivery",
    rank: 5,
    top: true,
    status: "Active",
    updatedAt: "2025-07-15T09:07:11.494611",
    keywords: ["courier", "pathao", "delivery company", "shipping"],
  },
  {
    id: "faq-002",
    question: "How long does delivery take?",
    answer:
      "Inside Dhaka: 1-3 business days. Outside Dhaka: 3-7 business days.",
    category: "Delivery",
    rank: 4,
    top: true,
    status: "Active",
    updatedAt: "2025-07-14T10:15:22.123456",
    keywords: ["delivery time", "shipping time", "duration"],
  },
  {
    id: "faq-003",
    question: "What payment methods do you accept?",
    answer:
      "We accept Cash on Delivery (COD), bKash, Nagad, credit/debit cards, and bank transfers.",
    category: "Payment",
    rank: 3,
    top: true,
    status: "Inactive",
    updatedAt: "2025-07-12T14:30:45.789012",
    keywords: ["payment", "methods", "COD", "bKash"],
  },
  {
    id: "faq-004",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via SMS and email. You can track it on our website or the courier's website.",
    category: "Order",
    rank: 2,
    top: false,
    status: "Active",
    updatedAt: "2025-07-10T11:20:33.456789",
    keywords: ["track", "order status", "tracking"],
  },
  {
    id: "faq-005",
    question: "What is your return policy?",
    answer:
      "We accept returns within 7 days of delivery for unused items with original packaging. Some items may be excluded.",
    category: "Returns",
    rank: 1,
    top: false,
    status: "Active",
    updatedAt: "2025-07-08T16:45:12.345678",
    keywords: ["return", "refund", "exchange"],
  },
];

const AdminFAQsPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    setFaqs(initialFAQs);
  }, []);

  useEffect(() => {
    let filtered = faqs;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(search.toLowerCase()) ||
          faq.answer.toLowerCase().includes(search.toLowerCase()) ||
          faq.keywords.some((keyword) =>
            keyword.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (faq) => faq.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Sort by rank
    filtered = [...filtered].sort((a, b) => a.rank - b.rank);

    setFilteredFAQs(filtered);
  }, [faqs, search, categoryFilter]);

  const handleAddOrUpdate = (data) => {
    if (selectedFAQ) {
      // Update existing FAQ
      setFaqs((prev) =>
        prev.map((f) => (f.id === selectedFAQ.id ? { ...f, ...data } : f))
      );
    } else {
      // Add new FAQ
      const newFAQ = {
        ...data,
        id: `faq-${Date.now()}`,
        updatedAt: new Date().toISOString(),
        keywords: data.keywords.split(",").map((k) => k.trim()),
      };
      setFaqs((prev) => [...prev, newFAQ]);
    }
    setSelectedFAQ(null);
  };

  const handleDelete = () => {
    setFaqs((prev) => prev.filter((f) => f.id !== faqToDelete.id));
    setFaqToDelete(null);
    setShowDelete(false);
  };

  const handleMoveRank = (id, direction) => {
    setFaqs((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === prev.length - 1)
      ) {
        return prev;
      }

      const newFAQs = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;

      // Swap ranks
      const tempRank = newFAQs[index].rank;
      newFAQs[index].rank = newFAQs[newIndex].rank;
      newFAQs[newIndex].rank = tempRank;

      // Swap positions
      [newFAQs[index], newFAQs[newIndex]] = [newFAQs[newIndex], newFAQs[index]];

      return newFAQs;
    });
  };

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(faqs.map((faq) => faq.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, [faqs]);

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "rank",
        cell: (value) => (
          <Space>
            <span>{value}</span>
            <div className="flex flex-col">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveRank(value.row.original.id, "up");
                }}
                className="text-gray-400 hover:text-gray-800"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveRank(value.row.original.id, "down");
                }}
                className="text-gray-400 hover:text-gray-800"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>
          </Space>
        ),
      },
      {
        header: "Question",
        accessorKey: "question",
        cell: (value) => (
          <div className="font-medium line-clamp-1">{value}</div>
        ),
      },
      {
        header: "Answer",
        accessorKey: "answer",
        cell: (value) => (
          <div className="text-muted-foreground line-clamp-2">{value}</div>
        ),
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: (value) => (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {value}
          </span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Top",
        accessorKey: "top",
        cell: (value) => <Tag status={value ? "Yes" : "No"} />,
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <EditButton
              onClick={() => {
                setSelectedFAQ(row);
                setShowModal(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                setFaqToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [faqs]
  );

  return (
    <div>
      {/* Header */}
      <AdminPageHeader
        title="Manage FAQs"
        actions={
          <>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Search questions or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />

            <Button
              onClick={() => {
                setSelectedFAQ(null);
                setShowModal(true);
              }}
              className="w-full md:w-auto"
            >
              Create FAQ
              <Plus className="w-4 h-4" />
            </Button>
          </>
        }
      />

      <GlobalTable
        data={filteredFAQs}
        columns={columns}
        itemsPerPage={10}
        className="w-full"
        rowClickHandler={(row) => {
          setSelectedFAQ(row);
          setShowModal(true);
        }}
      />

      <FAQModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedFAQ}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete FAQ"
        message={`Are you sure you want to delete "${faqToDelete?.question}"?`}
      />
    </div>
  );
};

export default AdminFAQsPage;
