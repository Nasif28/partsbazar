"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { Space } from "@/components/Global/Space";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { Tag } from "@/components/Global/Tag";
import { ViewContactModal } from "@/components/Admin/ViewContactModal";
import { DateFormatter } from "@/components/Global/DateFormatter";
import {
  DeleteButton,
  SendMailButton,
  ViewButton,
} from "@/components/Global/ActionButtons";
import { SendContactMailModal } from "@/components/Admin/SendContactMailModal";

const AdminContactListPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showSendMailModal, setShowSendMailModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    setContacts([
      {
        id: 1,
        name: "John Doe",
        number: "+1 (555) 123-4567",
        email: "john.doe@example.com",
        subject: "Product Inquiry",
        message:
          "I'm interested in your premium product line. Can you provide more details about specifications?",
        date: "2023-06-15T10:30:00Z",
        status: "new",
      },
      {
        id: 2,
        name: "Sarah Smith",
        number: "+44 7700 900123",
        email: "sarah.smith@example.com",
        subject: "Order Issue",
        message:
          "My order #12345 hasn't arrived yet. It's been 2 weeks since the shipping confirmation.",
        date: "2023-07-22T14:45:00Z",
        status: "in progress",
      },
      {
        id: 3,
        name: "Mike Johnson",
        number: "+61 412 345 678",
        email: "mike.j@example.com",
        subject: "Return Request",
        message:
          "I received a damaged item and would like to initiate a return. What's the process?",
        date: "2023-08-01T09:15:00Z",
        status: "resolved",
      },
      {
        id: 4,
        name: "Emily Wilson",
        number: "+33 6 12 34 56 78",
        email: "emily.w@example.com",
        subject: "Partnership Opportunity",
        message:
          "I represent XYZ Company and we're interested in partnering with your brand. Let's schedule a call.",
        date: "2023-08-10T16:20:00Z",
        status: "new",
      },
      {
        id: 5,
        name: "David Brown",
        number: "+49 151 12345678",
        email: "david.b@example.com",
        subject: "Technical Support",
        message:
          "I'm having trouble setting up the device I purchased. The manual wasn't clear about step 4.",
        date: "2023-08-15T11:05:00Z",
        status: "in progress",
      },
    ]);
  }, []);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.email.toLowerCase().includes(search.toLowerCase()) ||
          contact.subject.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [contacts, search]);

  const handleDelete = (contact) => {
    setContacts((prev) => prev.filter((c) => c.id !== contact.id));
    setShowDelete(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredContacts.indexOf(row) + 1,
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Contact",
        accessorKey: "contact",
        cell: (_, row) => (
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{row.number}</span>
            </div>

            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a
                href={`mailto:${row.email}`}
                className="text-primary hover:underline"
              >
                {row.email}
              </a>
            </div>
          </div>
        ),
      },
      {
        header: "Subject",
        accessorKey: "subject",
        cell: (value) => (
          <div className="flex items-start gap-2">
            <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
            <span className="line-clamp-1">{value}</span>
          </div>
        ),
      },
      {
        header: "Date",
        accessorKey: "date",
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
            <ViewButton
              onClick={() => {
                setSelectedContact(row);
                setShowViewModal(true);
              }}
            />

            <SendMailButton
              onClick={() => {
                setSelectedContact(row);
                setShowSendMailModal(true);
              }}
            />

            <DeleteButton
              onClick={() => {
                setSelectedContact(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredContacts]
  );

  return (
    <div>
      <AdminPageHeader
        title="Contact Requests"
        actions={
          <Input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80"
          />
        }
      />

      <GlobalTable
        data={filteredContacts}
        columns={columns}
        itemsPerPage={10}
        className="w-full"
      />

      <ViewContactModal
        open={showViewModal}
        onClose={() => setShowViewModal(false)}
        contact={selectedContact}
      />

      <SendContactMailModal
        open={showSendMailModal}
        onClose={() => setShowSendMailModal(false)}
        contact={selectedContact}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => handleDelete(selectedContact)}
        title="Delete Contact Request"
        message={`Are you sure you want to delete the contact request from ${selectedContact?.name}?`}
      />
    </div>
  );
};

export default AdminContactListPage;
