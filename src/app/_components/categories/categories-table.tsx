"use client";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/app/_components/ui/data-table";
import { EditCategoryModal } from "./edit-category-modal";
import { DeleteCategoryModal } from "./delete-category-modal";
const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "_count.products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-4">
        <EditCategoryModal
          defaultName={row.original.name}
          id={row.original.id}
        />

        <DeleteCategoryModal id={row.original.id} />
      </div>
    ),
  },
];

export const CategoriesTable = ({ data }: { data: Category[] }) => {
  return <DataTable columns={columns} data={data} />;
};
