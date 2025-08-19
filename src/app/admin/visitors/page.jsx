"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Globe, Calendar, Clock, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { DeleteModal } from "@/components/Global/DeleteModal";
import { Space } from "@/components/Global/Space";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AddVisitorModal } from "@/components/Admin/AddVisitorModal";
import { ViewVisitorModal } from "@/components/Admin/ViewVisitorModal";
import { DateFormatter } from "@/components/Global/DateFormatter";
import { DeleteButton, ViewButton } from "@/components/Global/ActionButtons";

const AdminVisitorsPage = () => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  useEffect(() => {
    setVisitors([
      {
        id: 1,
        ip: "192.168.1.101",
        blocked: false,
        lastVisited: "2023-08-20T14:30:00Z",
        country: "United States",
        countryCode: "US",
        region: "California",
        city: "San Francisco",
        latitude: 37.7749,
        longitude: -122.4194,
        os: "Windows 10",
        browser: "Chrome 115",
        device: "Desktop",
      },
      {
        id: 2,
        ip: "203.0.113.42",
        blocked: true,
        lastVisited: "2023-08-19T09:15:00Z",
        country: "Germany",
        countryCode: "DE",
        region: "Berlin",
        city: "Berlin",
        latitude: 52.52,
        longitude: 13.405,
        os: "Mac OS",
        browser: "Safari 16",
        device: "Laptop",
      },
      {
        id: 3,
        ip: "198.51.100.23",
        blocked: false,
        lastVisited: "2023-08-18T16:45:00Z",
        country: "Japan",
        countryCode: "JP",
        region: "Tokyo",
        city: "Shibuya",
        latitude: 35.6895,
        longitude: 139.6917,
        os: "iOS 16",
        browser: "Safari Mobile",
        device: "iPhone",
      },
      {
        id: 4,
        ip: "172.16.254.1",
        blocked: false,
        lastVisited: "2023-08-17T11:20:00Z",
        country: "Brazil",
        countryCode: "BR",
        region: "São Paulo",
        city: "São Paulo",
        latitude: -23.5505,
        longitude: -46.6333,
        os: "Android 13",
        browser: "Chrome Mobile",
        device: "Samsung Galaxy",
      },
      {
        id: 5,
        ip: "10.0.0.55",
        blocked: true,
        lastVisited: "2023-08-16T08:05:00Z",
        country: "Australia",
        countryCode: "AU",
        region: "New South Wales",
        city: "Sydney",
        latitude: -33.8688,
        longitude: 151.2093,
        os: "Windows 11",
        browser: "Edge 115",
        device: "Desktop",
      },
    ]);
  }, []);

  useEffect(() => {
    setFilteredVisitors(
      visitors.filter(
        (visitor) =>
          visitor.ip.includes(search) ||
          (visitor.country &&
            visitor.country.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [visitors, search]);

  const handleAddOrUpdate = (data) => {
    if (selectedVisitor) {
      // Update existing visitor
      setVisitors((prev) =>
        prev.map((v) => (v.id === selectedVisitor.id ? { ...v, ...data } : v))
      );
    } else {
      // Add new visitor
      const newVisitor = {
        ...data,
        id: Date.now(),
        lastVisited: new Date().toISOString(),
        // Add mock geo data for new entries
        country: "Unknown",
        countryCode: "XX",
        region: "Unknown",
        city: "Unknown",
        latitude: 0,
        longitude: 0,
        os: "Unknown",
        browser: "Unknown",
        device: "Unknown",
      };
      setVisitors((prev) => [...prev, newVisitor]);
    }
    setSelectedVisitor(null);
  };

  const handleDelete = () => {
    setVisitors((prev) => prev.filter((v) => v.id !== selectedVisitor.id));
    setSelectedVisitor(null);
    setShowDelete(false);
  };

  const toggleBlockStatus = (visitor) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === visitor.id ? { ...v, blocked: !v.blocked } : v))
    );
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => filteredVisitors.indexOf(row) + 1,
      },
      {
        header: "IP Address",
        accessorKey: "ip",
        cell: (value) => (
          <Space>
            <Globe className="w-4 h-4 text-primary" />
            <span className="font-mono">{value}</span>
          </Space>
        ),
      },
      {
        header: "Block",
        accessorKey: "blocked",
        cell: (_, row) => (
          <Space>
            <Switch
              id={`block-${row.id}`}
              checked={row.blocked}
              onCheckedChange={() => toggleBlockStatus(row)}
              className="data-[state=checked]:bg-primary"
            />
            <Label htmlFor={`block-${row.id}`}>
              {row.blocked ? "Blocked" : "Allowed"}
            </Label>
          </Space>
        ),
      },
      {
        header: "Last Visited",
        accessorKey: "lastVisited",
        cell: (value) => <DateFormatter date={value} />,
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <ViewButton
              onClick={() => {
                setSelectedVisitor(row);
                setShowViewModal(true);
              }}
            />

            <DeleteButton
              onClick={() => {
                setSelectedVisitor(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    [filteredVisitors]
  );

  return (
    <div>
      <AdminPageHeader
        title="Website Visitors"
        actions={
          <>
            <Input
              type="text"
              placeholder="Search by IP or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
            <Button
              onClick={() => {
                setSelectedVisitor(null);
                setShowAddModal(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Visitor
            </Button>
          </>
        }
      />

      <GlobalTable
        data={filteredVisitors}
        columns={columns}
        itemsPerPage={10}
        className="w-full"
      />

      <AddVisitorModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddOrUpdate}
        initialData={selectedVisitor}
      />

      <ViewVisitorModal
        open={showViewModal}
        onClose={() => setShowViewModal(false)}
        visitor={selectedVisitor}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Visitor"
        message={`Are you sure you want to delete visitor with IP ${selectedVisitor?.ip}?`}
      />
    </div>
  );
};

export default AdminVisitorsPage;
