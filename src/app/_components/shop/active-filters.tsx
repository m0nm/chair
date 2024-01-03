"use client";

import { Badge } from "../ui/badge";
import { toCurrency } from "../../_lib/utils";
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

      if (typeof param === "string") params.delete(param);
      else param.forEach((p) => params.delete(p));

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="my-4 flex flex-wrap items-center gap-4">
      {searchParams.has("condition") && (
        <Badge variant="secondary" className="bg-background">
          condition: {searchParams.get("condition")}
          <button
            className="ml-2"
            title="remove condition filter"
            onClick={() =>
              router.replace(`/shop?${deleteSearchParams("condition")}`)
            }
          >
            <XIcon className="hover:text-red-500" size={16} />
          </button>
        </Badge>
      )}

      {searchParams.has("category") && (
        <Badge variant="secondary" className="bg-background">
          Category: {searchParams.get("category")}
          <button
            className="ml-2"
            title="remove category filter"
            onClick={() =>
              router.replace(`/shop?${deleteSearchParams("category")}`)
            }
          >
            <XIcon className="hover:text-red-500" size={16} />
          </button>
        </Badge>
      )}

      {searchParams.has("price_start") && (
        <Badge variant="secondary" className="bg-background">
          Price Range:{" "}
          {toCurrency(parseInt(searchParams.get("price_start") as string))} -{" "}
          {toCurrency(parseInt(searchParams.get("price_end") as string))}
          <button
            className="ml-2"
            title="remove price range filter"
            onClick={() =>
              router.replace(
                `/shop?${deleteSearchParams(["price_start", "price_end"])}`,
              )
            }
          >
            <XIcon className="hover:text-red-500" size={16} />
          </button>
        </Badge>
      )}

      {Boolean(decodeURI(searchParams.toString())) &&
        !searchParams.has("layout") && (
          <Badge
            variant="secondary"
            className="cursor-pointer bg-background"
            onClick={() => router.replace("/shop")}
          >
            Clear All
          </Badge>
        )}
    </div>
  );
};
