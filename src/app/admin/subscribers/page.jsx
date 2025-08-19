"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { Space } from "@/components/Global/Space";
import { DeleteButton, EditButton } from "@/components/Global/ActionButtons";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { Tag } from "@/components/Global/Tag";
import { SubscriberModal } from "@/components/Admin/SubscriberModal";
import { SendMailModal } from "@/components/Admin/SendMailModal";
import { DateFormatter } from "@/components/Global/DateFormatter";

const AdminSubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSendMailModal, setShowSendMailModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [subscriberToDelete, setSubscriberToDelete] = useState(null);

  useEffect(() => {
    setSubscribers([
      {
        id: 1,
        email: "john.doe@example.com",
        joinedAt: "2023-06-15T10:30:00Z",
        status: "active",
      },
      {
        id: 2,
        email: "sarah.smith@example.com",
        joinedAt: "2023-07-22T14:45:00Z",
        status: "active",
      },
      {
        id: 3,
        email: "mike.jones@example.com",
        joinedAt: "2023-08-01T09:15:00Z",
        status: "inactive",
      },
      {
        id: 4,
        email: "emily.wilson@example.com",
        joinedAt: "2023-08-10T16:20:00Z",
        status: "active",
      },
      {
        id: 5,
        email: "david.brown@example.com",
        joinedAt: "2023-08-15T11:05:00Z",
        status: "inactive",
      },
    ]);
  }, []);

  useEffect(() => {
    setFilteredSubscribers(
      subscribers.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [subscribers, search]);

  const activeSubscribersCount = useMemo(() => {
    return subscribers.filter((s) => s.status === "active").length;
  }, [subscribers]);

  const handleAddOrUpdate = (data) => {
    if (selectedSubscriber) {
      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === selectedSubscriber.id ? { ...s, ...data } : s
        )
      );
    } else {
      const newSubscriber = {
        ...data,
        id: Date.now(),
        joinedAt: new Date().toISOString(),
      };
      setSubscribers((prev) => [...prev, newSubscriber]);
    }
    setSelectedSubscriber(null);
  };

  const handleDelete = () => {
    setSubscribers((prev) =>
      prev.filter((s) => s.id !== subscriberToDelete.id)
    );
    setSubscriberToDelete(null);
    setShowDelete(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredSubscribers.indexOf(row) + 1,
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (value) => (
          <a href={`mailto:${value}`} className="text-primary hover:underline">
            {value}
          </a>
        ),
      },
      {
        header: "Joined At",
        accessorKey: "joinedAt",
        cell: (value) => <DateFormatter date={value} />,
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
                setSelectedSubscriber(row);
                setShowEditModal(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                setSubscriberToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredSubscribers]
  );

  return (
    <div>
      <AdminPageHeader
        title="Manage Subscribers"
        actions={
          <>
            <Input
              type="text"
              placeholder="Search subscribers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />

            <Button
              onClick={() => setShowSendMailModal(true)}
              variant="highlight"
            >
              <Mail className="w-4 h-4" />
              Send Mail ({activeSubscribersCount})
            </Button>

            <Button
              onClick={() => {
                setSelectedSubscriber(null);
                setShowEditModal(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Subscriber
            </Button>
          </>
        }
      />

      <GlobalTable
        data={filteredSubscribers}
        columns={columns}
        itemsPerPage={10}
        className="w-full"
      />

      <SubscriberModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedSubscriber}
      />

      <SendMailModal
        open={showSendMailModal}
        onClose={() => setShowSendMailModal(false)}
        count={activeSubscribersCount}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Subscriber"
        message={`Are you sure you want to delete "${subscriberToDelete?.email}"?`}
      />
    </div>
  );
};

export default AdminSubscribersPage;
