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
  { label: "3 Columns", value: "three-columns" },
  { label: "4 Columns", value: "four-columns" },
  { label: "List", value: "list" },
];

export function ProductsLayout() {
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
      defaultValue="three-columns"
      onValueChange={(value) => createSearchParams("layout", value)}
    >
      <SelectTrigger className="w-[180px]">
        <span className="font-semibold">{t("layout")}:</span>
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
