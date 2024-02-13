"use client";
import { toCurrency } from "@/app/_lib/utils";
import { Badge } from "../ui/badge";
import { XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const ActiveFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const deleteSearchParams = useCallback(
    (param: string | string[]) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams);

      if (param === "all") {
        params.delete("condition");
        params.delete("category");
        params.delete("price_start");
        params.delete("price_end");
      } else if (typeof param === "string") params.delete(param);
      else param.forEach((p) => params.delete(p));

      router.replace(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  return (
    <div className="my-4 flex flex-wrap items-center gap-4">
      {searchParams.has("condition") && (
        <Badge variant="secondary" className="bg-background">
          condition:{" "}
          {decodeURI(searchParams.get("condition") as string)
            .replace("_", " ")
            .toUpperCase()}
          <button
            className="ml-2"
            title="remove condition filter"
            onClick={() => deleteSearchParams("condition")}
          >
            <XIcon className="hover:text-red-500" size={16} />
          </button>
        </Badge>
      )}

      {searchParams.has("category") && (
        <Badge variant="secondary" className="bg-background">
          Category: {decodeURI(searchParams.get("category") as string)}
          <button
            className="ml-2"
            title="remove category filter"
            onClick={() => deleteSearchParams("category")}
          >
            <XIcon className="hover:text-red-500" size={16} />
          </button>
        </Badge>
      )}

      {searchParams.has("price_start") && (
        <Badge variant="secondary" className="bg-background">
          Price Range:{" "}
          {toCurrency(parseFloat(searchParams.get("price_start") as string))} -{" "}
          {toCurrency(parseFloat(searchParams.get("price_end") as string))}
          <button
            className="ml-2"
            title="remove price range filter"
            onClick={() => deleteSearchParams(["price_start", "price_end"])}
          >
            <XIcon className="hover:text-red-500" size={16} />
          </button>
        </Badge>
      )}

      {Boolean(
        searchParams.has("condition") ||
          searchParams.has("category") ||
          searchParams.has("price_start"),
      ) && (
        <Badge
          variant="secondary"
          className="cursor-pointer bg-background"
          onClick={() => deleteSearchParams("all")}
        >
          Clear All
        </Badge>
      )}
    </div>
  );
};
