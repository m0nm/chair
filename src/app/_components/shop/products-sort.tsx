"use client";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

const ITEMS = [
  { label: "Default", value: "default" },
  { label: "Latest", value: "latest" },
  { label: "Price (Low to High)", value: "price-low" },
  { label: "Price (High to Low)", value: "price-high" },
];

export function ProductsSort() {
  const searchParams = useSearchParams();

  const createSearchParams = useCallback(
    (name: string, value: string) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      params.set(name, encodeURIComponent(value));

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Select defaultValue="default">
      <SelectTrigger className="w-52">
        <span className="w-fit whitespace-nowrap font-semibold">Sort By:</span>
        <SelectValue defaultValue={"default"} />
      </SelectTrigger>

      <SelectContent className="w-56">
        {ITEMS.map((item) => (
          <SelectItem
            className="!justify-start truncate !text-left"
            key={item.label}
            value={item.value}
            onClick={() => createSearchParams("sort_by", item.value)}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
