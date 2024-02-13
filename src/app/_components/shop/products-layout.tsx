"use client";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

const ITEMS = [
  { label: "3 Columns", value: "three-columns" },
  { label: "4 Columns", value: "four-columns" },
  { label: "List", value: "list" },
];

export function ProductsLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createSearchParams = useCallback(
    (name: string, value: string) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      params.set(name, encodeURIComponent(value));

      router.replace(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  return (
    <Select
      defaultValue="three-columns"
      onValueChange={(value) => createSearchParams("layout", value)}
    >
      <SelectTrigger className="w-[180px]">
        <span className="font-semibold">Layout:</span>
        <SelectValue defaultValue={"three-columns"} />
      </SelectTrigger>

      <SelectContent className="w-56">
        {ITEMS.map((item) => (
          <SelectItem key={item.label} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
