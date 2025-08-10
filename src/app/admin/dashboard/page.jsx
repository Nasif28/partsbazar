"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import dashboardData from "@/data/Dashboard.json";
import {
  Download,
  ArrowRight,
  MoreHorizontal,
  Star,
  StarHalf,
} from "lucide-react";
import Link from "next/link";
import { GlobalTable } from "@/components/Global/GlobalTable";
import { Empty } from "@/components/Global/Empty";
import ordersData from "@/data/Orders.json";
import { Tag } from "@/components/Global/Tag";
import {
  DeleteButton,
  EditButton,
  PrintButton,
  ViewButton,
} from "@/components/Global/ActionButtons";
import { Space } from "@/components/Global/Space";
import { DateFormatter } from "@/components/Global/DateFormatter";

function SummaryCard({ title, value, link }) {
  return (
    <div className="bg-card p-4 border border-border hover:shadow-sm">
      <h3 className="text-muted-foreground text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold mb-2">
        {typeof value === "number" ? value.toLocaleString() : value}
        {title.includes("TK") && " TK"}
      </p>

      <Link
        href="#"
        className="flex items-center gap-2 text-primary hover:text-primary-dark"
      >
        {link} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

// Reusable Insight Card Component
function InsightCard({ title, children }) {
  return (
    <div className="bg-card shadow-sm p-4 border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      {children}
    </div>
  );
}

// Reusable Bar Chart Component
function BarChart({ data, labels, height = 100 }) {
  const maxValue = Math.max(...data);

  return (
    <div className="flex items-end h-full space-x-1">
      {data.map((value, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-primary rounded-t"
            style={{
              height: `${(value / maxValue) * height}px`,
              maxHeight: `${height}px`,
            }}
          ></div>
          <span className="text-xs mt-1">{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

// Reusable Rating Component
function Rating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400">
          {i < fullStars ? (
            <Star className="w-4 h-4 fill-current" />
          ) : i === fullStars && hasHalfStar ? (
            <StarHalf className="w-4 h-4 fill-current" />
          ) : (
            <Star className="w-4 h-4" />
          )}
        </span>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data] = useState(dashboardData);

  const downloadJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Latest Order Table Column
  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "sn",
        cell: (_, row) => ordersData.indexOf(row) + 1,
      },
      {
        header: "Order ID",
        accessorKey: "id",
        cell: (value) => (
          <a
            href={`/admin/orders/${value}`}
            className="text-primary hover:underline font-medium"
          >
            {value}
          </a>
        ),
      },
      {
        header: "Customer Info",
        accessorKey: "customer",
        cell: (value) => (
          <div>
            <div className="font-medium">{value.name}</div>
            <div className="text-sm text-muted-foreground">{value.phone}</div>
          </div>
        ),
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: (value) => <DateFormatter date={value} />,
      },
      {
        header: "Payment Status",
        accessorKey: "paymentStatus",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Order Status",
        accessorKey: "orderStatus",
        cell: (value) => <Tag status={value} />,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: (value) => `$${value.toFixed(2)}`,
      },
      {
        header: "Shipping Method",
        accessorKey: "shippingMethod",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (_, row) => (
          <Space>
            <ViewButton
              onClick={() => {
                setSelectedBrand(row);
                setShowModal(true);
              }}
            />
            <PrintButton
              onClick={() => {
                setSelectedBrand(row);
                setShowModal(true);
              }}
            />
            <EditButton
              onClick={() => {
                setSelectedBrand(row);
                setShowModal(true);
              }}
            />
            <DeleteButton
              onClick={() => {
                setBrandToDelete(row);
                setShowDelete(true);
              }}
            />
          </Space>
        ),
      },
    ],
    []
  );

  // Best Selling Product Table Column
  const bestColumns = useMemo(
    () => [
      {
        header: "Product",
        accessorKey: "product",
      },
      {
        header: "Total Sold",
        accessorKey: "totalSold",
      },
      {
        header: "Info",
        accessorKey: "pricing",
      },
      {
        header: "Top Item",
        accessorKey: "topItem",
      },
      {
        header: "Rating",
        accessorKey: "rating",
        cell: ({ value }) => <Rating rating={value} />,
      },
      {
        header: "Time",
        accessorKey: "time",
      },
    ],
    []
  );
  return (
    <div>
      {/* Header  */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-bold">
            Welcome Back, {data.welcome.name}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your store today
          </p>
        </div>
        <Button onClick={downloadJSON} className="mt-2 md:mt-0">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Total Earnings */}
      <div className="bg-primary text-white p-6 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl">TOTAL EARNINGS</p>
            <h2 className="text-3xl font-bold mt-2">
              {data.welcome.totalEarnings.toLocaleString()}{" "}
              {data.welcome.currency}
            </h2>
          </div>
          <Button variant="secondary" size="lg">
            View All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {data.summaryCards.map((card, index) => (
          <SummaryCard
            key={index}
            title={card.title}
            value={card.value}
            link={card.link}
          />
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Monthly Order Insight */}
          <InsightCard title="Monthly Order Insight">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">
                {data.monthlyOrderInsight.total}
              </p>
            </div>

            <div className="mt-4">
              <BarChart
                data={data.monthlyOrderInsight.orders}
                labels={data.monthlyOrderInsight.months.map((m) =>
                  m.slice(0, 3)
                )}
                // height={80}
              />
            </div>
          </InsightCard>

          {/* Latest Orders */}
          <InsightCard title="Latest Orders">
            <div className="overflow-x-auto">
              {ordersData.length > 0 ? (
                <GlobalTable
                  data={ordersData.slice(0, 5)}
                  columns={columns}
                  itemsPerPage={10}
                />
              ) : (
                <Empty />
              )}
            </div>
          </InsightCard>

          {/* Best Selling Products */}
          <InsightCard title="Best Selling Products">
            <div className="overflow-x-auto">
              {data.bestSellingProducts.length > 0 ? (
                <GlobalTable
                  data={data.bestSellingProducts}
                  columns={bestColumns}
                  itemsPerPage={10}
                />
              ) : (
                <Empty />
              )}
            </div>
          </InsightCard>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Top Category */}
          <InsightCard title="Top Category">
            <ul className="space-y-3">
              {data.topCategories.map((category, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.inventory}
                  </span>
                </li>
              ))}
            </ul>
          </InsightCard>

          {/* Orders Insight */}
          <InsightCard title="Orders Insight">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-xl font-bold">
                  {data.ordersInsight.totalOrders}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-xl font-bold">
                  {data.ordersInsight.pendingOrders}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Digital Orders</p>
                <p className="text-xl font-bold">
                  {data.ordersInsight.digitalOrders}
                </p>
              </div>
            </div>
          </InsightCard>

          {/* Product Insight */}
          <InsightCard title="Product Insight">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Product</p>
                <p className="text-xl font-bold">
                  {data.productInsight.totalProducts}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Minerals Product
                </p>
                <p className="text-xl font-bold">
                  {data.productInsight.mineralsProduct}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Digital Product</p>
                <p className="text-xl font-bold">
                  {data.productInsight.digitalProduct}
                </p>
              </div>
            </div>
          </InsightCard>

          {/* Latest Transactions */}
          <InsightCard title="Latest Transactions">
            <div className="text-center py-8 text-muted-foreground">
              <p>No transactions found</p>
            </div>
          </InsightCard>

          {/* Earning Insight */}
          <InsightCard title="Earning Insight">
            <div>
              <BarChart
                data={data.earningInsight}
                labels={["Q1", "Q2", "Q3", "Q4"]}
              />
            </div>
          </InsightCard>
        </div>
      </div>

      {/* Web Visitors Insight */}
      <div className="mt-4">
        <InsightCard title="Web Visitors Insight (2025)">
          <div className="">
            <BarChart
              data={data.webVisitors.data}
              labels={data.webVisitors.labels}
              height="200"
            />
          </div>
        </InsightCard>
      </div>
    </div>
  );
}
