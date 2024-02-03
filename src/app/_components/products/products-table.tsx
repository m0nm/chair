"use client";

import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import type { Prisma } from "@prisma/client";

import { DeleteProductModal } from "./delete-product-modal";
import { DataTable, DataTableColumnHeader } from "../ui/data-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

type Product = Prisma.ProductGetPayload<{
  select: {
    name: true;
    price: true;
    salePrice: true;
    thumbnail: true;
    condition: true;
    published: true;
    stock: true;
    id: true;
    category: true;
  };
}>;

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12">
          <Image
            src={row.original.thumbnail}
            alt="product image"
            className="object-cover"
            fill
          />
        </div>

        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <span>{row.original.category?.name ?? "N/A"}</span>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "salePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale Price" />
    ),
    cell: ({ row }) => <span>{row.original.salePrice ?? "N/A"}</span>,
  },
  {
    accessorKey: "condition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Condition" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.condition == "NEW" ? (
          <Badge className="bg-cyan-500 hover:bg-cyan-400">NEW</Badge>
        ) : row.original.condition == "HOT" ? (
          <Badge variant={"destructive"}>HOT</Badge>
        ) : (
          <Badge className="bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-400 dark:hover:bg-neutral-300">
            Regular
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Availability" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.stock >= 15 ? (
          <Badge className="bg-green-500 hover:bg-green-400">In Stock</Badge>
        ) : row.original.stock === 0 ? (
          <Badge className="bg-gray-400 hover:bg-gray-500">Out Of Stock</Badge>
        ) : (
          <Badge className="bg-orange-500 hover:bg-orange-400">Limited</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.published ? (
          <Badge className="bg-lime-500 hover:bg-lime-400">Published</Badge>
        ) : (
          <Badge className="bg-primary-500 hover:bg-primary-400">
            Archived
          </Badge>
        )}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {/* edit button */}
        <Button
          asChild
          title="edit"
          variant="ghost"
          size="icon"
          className="hover:text-primary-500 p-0 text-gray-600"
        >
          <Link href={"/products/edit" + `/${row.original.id}`}>
            <Pencil size={18} />
          </Link>
        </Button>

        <DeleteProductModal id={row.original.id} />
      </div>
    ),
  },
];

type IProps = {
  data: Product[];
};

export const ProductsTable = ({ data }: IProps) => {
  return <DataTable columns={columns} data={data} />;
};
