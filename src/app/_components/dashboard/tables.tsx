"use client";

import Image from "next/image";
import productImage from "@/../public/product.jpg";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { DataTable, DataTableColumnHeader } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { EditIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/app/_lib/utils";

const bestSellersData = [
  {
    image: "/product.jpg",
    name: "Nike Women's Race Running Shoe",
    category: "Women shoes",
    sales: "$4,345",
  },
  {
    image: "/product.jpg",
    name: "Nike Womens Free RN Flyknit 2018",
    category: "Women shoes",
    sales: "$3,235",
  },
  {
    image: "/product.jpg",
    name: "Nike Women's Sneaker Running Shoes",
    category: "Women shoes",
    sales: "$1,545",
  },
  {
    image: "/product.jpg",
    name: "Nike Women's Gymnastics Tennis Shoes",
    category: "Women shoes",
    sales: "$1,045",
  },
  {
    image: "/product.jpg",
    name: "Nike Women's Gymnastics Tennis Shoes",
    category: "Women shoes",
    sales: "$1,045",
  },
  {
    image: "/product.jpg",
    name: "Nike Women's Gymnastics Tennis Shoes",
    category: "Women shoes",
    sales: "$1,045",
  },
];

export const BestSellersTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Best Seller</TableHead>
          <TableHead className="w-4/5 flex-1"></TableHead>
          <TableHead className="text-right">Sales</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bestSellersData.map((item, i) => (
          <TableRow key={i + item.sales}>
            <TableCell className="relative">
              <Image
                src={productImage}
                alt="product image"
                width={120}
                height={120}
                className="rounded-full"
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-green-600">{item.sales}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const latestOrdersData = [
  {
    orderId: "#inv12637",
    name: "John Thomas",
    location: "California, USA",
    status: "Paid",
    date: "May 09, 2025",
    amount: "$79",
  },
  {
    orderId: "#inv12636",
    name: "Daniel",
    location: "San Francisco, USA",
    status: "Processing",
    date: "May 09, 2025",
    amount: "$119",
  },
  {
    orderId: "#inv12635",

    name: "Vinjay Khan",
    location: "New Delhi, India",
    status: "Packing",
    date: "May 09, 2025",
    amount: "$58",
  },
  {
    orderId: "#inv12634",

    name: "David Arya",
    location: "Jakarta, Indonesia",
    status: "Shipped",
    date: "May 09, 2025",
    amount: "$79",
  },
  {
    orderId: "#inv12633",

    name: "William Stone",
    location: "London, UK",
    status: "Complete",
    date: "May 09, 2025",
    amount: "$158",
  },
  {
    orderId: "#inv12632",

    name: "Danile",
    location: "California, US",
    status: "Complete",
    date: "May 08, 2025",
    amount: "$128",
  },
  {
    orderId: "#inv12631",

    name: "Romano",
    location: "California, US",
    status: "Complete",
    date: "May 08, 2025",
    amount: "$98",
  },
  {
    orderId: "#inv12630",

    name: "Yonanda",
    location: "California, US",
    status: "Complete",
    date: "May 08, 2025",
    amount: "$138",
  },
  {
    orderId: "#inv12629",

    name: "Danile",
    location: "California, US",
    status: "Complete",
    date: "May 08, 2025",
    amount: "$128",
  },
  {
    orderId: "#inv12628",

    name: "Romano",
    location: "California, US",
    status: "Complete",
    date: "May 08, 2025",
    amount: "$98",
  },
];

const latestOrdersColumns: ColumnDef<(typeof latestOrdersData)[0]>[] = [
  {
    accessorKey: "location",
    header: ({ column }) => <div className="hidden w-0" />,
    cell: ({ row }) => <div className="hidden w-0" />,
  },
  {
    accessorKey: "order",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" className="-ml-6" />
    ),
    cell: ({ row }) => (
      <span className="-ml-6 font-medium">{row.original.orderId}</span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Customer"
        className="hidden md:inline-block"
      />
    ),
    cell: ({ row }) => (
      <div className="hidden md:inline-block">
        <h6>{row.original.name}</h6>
        <span className="text-xs text-muted  dark:text-gray-400">
          {row.original.location}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        className={cn(
          "font-semibold",
          { "bg-red-400 hover:bg-red-500": row.original.status == "Paid" },
          {
            "bg-green-400 hover:bg-green-500": row.original.status == "Shipped",
          },
          {
            "bg-yellow-400 hover:bg-yellow-500":
              row.original.status == "Packing",
          },
          {
            "bg-indigo-400 hover:bg-indigo-500":
              row.original.status == "Processing",
          },
          {
            "bg-gray-300 hover:bg-gray-500": row.original.status == "Complete",
          },
        )}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date Added"
        className="hidden md:inline-block"
      />
    ),
    cell: ({ row }) => (
      <span className="hidden md:inline-block">{row.original.date}</span>
    ),
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button size={"icon"} className="rounded-sm">
          <EditIcon size={16} />
        </Button>
      </div>
    ),
  },
];

export const LatestOrdersTable = () => {
  return <DataTable columns={latestOrdersColumns} data={latestOrdersData} />;
};
