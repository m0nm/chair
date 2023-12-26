"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader } from "../ui/data-table";
import { useParams } from "next/navigation";
import { dictMatcher } from "@/app/_lib/utils";
import { dict } from "@/app/_config/i18n/customers-dict";

type IColumn = {
  name: string;
  email: string;
  customerId: string;
  country: string;
  totalSpent: string;
  order: string;
};

function generateData(n: number) {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({
      name: "Zeke Arton",
      email: "zarton8@weibo.com",
      customerId: "#" + (Math.random() * 1000000).toFixed(0),
      country: "England",
      order: (Math.random() * 1000).toFixed(0),
      totalSpent:
        "$" + (Math.random() * 1000).toFixed(0) + Math.random().toFixed(2),
    });
  }
  return data;
}

export const CustomersTable = () => {
  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en");

  const columns: ColumnDef<IColumn>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader title={t("customer")} column={column} />
      ),
      cell: ({ row }) => (
        <div className="hidden md:inline-block">
          <h6>{row.original.name}</h6>
          <span className="text-xs text-muted  dark:text-gray-400">
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "customerId",
      header: ({ column }) => (
        <DataTableColumnHeader title={t("customerId")} column={column} />
      ),
    },
    {
      accessorKey: "country",
      header: ({ column }) => (
        <DataTableColumnHeader title={t("country")} column={column} />
      ),
    },
    {
      accessorKey: "order",
      header: ({ column }) => (
        <DataTableColumnHeader title={t("order")} column={column} />
      ),
    },
    {
      accessorKey: "totalSpent",
      header: ({ column }) => (
        <DataTableColumnHeader title={t("totalSpent")} column={column} />
      ),
    },
  ];

  return <DataTable columns={columns} data={generateData(60)} />;
};
