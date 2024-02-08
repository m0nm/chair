"use client";

import Link from "next/link";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Pencil } from "lucide-react";
import { DataTable, DataTableColumnHeader } from "../ui/data-table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { DeleteCouponModal } from "./delete-coupon-modal";

type Coupon = Prisma.CouponGetPayload<{}>;

const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "startingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Starting Date" />
    ),
    cell: ({ row }) => <span>{format(row.original.startingDate, "PPP")}</span>,
  },
  {
    accessorKey: "expirationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiration Date" />
    ),
    cell: ({ row }) => (
      <span>{format(row.original.expirationDate, "PPP")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) =>
      row.original.status === "ACTIVE" ? (
        <Badge className="bg-green-500 hover:bg-green-400">Active</Badge>
      ) : new Date() > row.original.expirationDate ? (
        <Badge variant={"destructive"}>Expired</Badge>
      ) : (
        <Badge className="bg-gray-500 hover:bg-gray-400">Not Active</Badge>
      ),
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-3">
        {/* edit */}
        <EditCoupon id={row.original.id} />

        {/* delete */}
        <DeleteCouponModal id={row.original.id} />
      </div>
    ),
  },
];

type IProps = {
  data: Coupon[];
};

export const CouponsTable = ({ data }: IProps) => {
  return <DataTable columns={columns} data={data} />;
};

function EditCoupon({ id }: { id: string }) {
  return (
    <Button title="view" variant="ghost" size="icon" className="w-fit">
      <Link href={`/coupons/edit/${id}`}>
        <Pencil size={18} />
      </Link>
    </Button>
  );
}
