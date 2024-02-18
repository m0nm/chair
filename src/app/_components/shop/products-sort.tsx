"use client";
import { useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { dictMatcher } from "@/app/_lib/utils";
import { dict } from "@/app/_config/i18n/shop-dict";

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
  { label: "Price (Low to High)", value: "price_asc" },
  { label: "Price (High to Low)", value: "price_desc" },
];

export function ProductsSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en");

  const createSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, encodeURIComponent(value));
      router.replace(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  return (
    <Select
      dir={lang == "ar" ? "rtl" : "ltr"}
      defaultValue="default"
      onValueChange={(value) => createSearchParams("sort_by", value)}
    >
      <SelectTrigger className="w-52">
        <span className="w-fit whitespace-nowrap font-semibold">
          {t("sortBy")}:
        </span>
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="w-56">
        {ITEMS.map((item) => (
          <SelectItem
            className="!justify-start truncate !text-left"
            key={item.label}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
