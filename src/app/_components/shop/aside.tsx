"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { cn, toCurrency } from "../../_lib/utils";

export const Aside = ({
  categories,
}: {
  categories: (Category & { _count: { products: number } })[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [range, setRange] = useState([20, 800]);

  const createSearchParams = useCallback(
    (param: { [key: string]: string }) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      Object.entries(param).forEach(([key, value]) => {
        params.set(key, encodeURIComponent(value));
      });

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="sticky w-full space-y-9 px-4">
      {/* categories */}
      <div>
        <h4 className="mb-4 text-lg font-medium">Categories</h4>
        <ul className="space-y-2">
          <li>
            <Button
              variant={"link"}
              className="hover:text-primary-500 hover:dark:text-primary-400 text-gray-600 !no-underline dark:text-gray-100"
            >
              <Link href="/shop" replace>
                All
              </Link>
            </Button>
          </li>

          {categories.map((c) => (
            <li key={c.id}>
              <Button
                variant={"link"}
                className={cn(
                  "hover:text-primary-600 hover:dark:text-primary-400 text-gray-600 !no-underline dark:text-gray-100",
                  searchParams.get("category") === c.name &&
                    "!text-primary-600 dark:!text-primary-400",
                )}
              >
                <Link
                  replace
                  href={`/shop?${createSearchParams({ category: c.name })}`}
                >
                  {c.name} ({c._count.products})
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* condition */}
      <div>
        <h4 className="mb-4 text-lg font-medium">Condition</h4>
        <ul className="space-y-2">
          {["HOT", "NEW", "ON SALE"].map((c, i) => (
            <li key={i}>
              <Button
                variant={"link"}
                className={cn(
                  "hover:text-primary-600 hover:dark:text-primary-400 text-gray-600 !no-underline dark:text-gray-100",
                  searchParams.get("condition") === c &&
                    "!text-primary-600 dark:!text-primary-400",
                )}
              >
                <Link
                  replace
                  href={`/shop?${createSearchParams({ condition: c })}`}
                >
                  {c}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* price */}
      <div>
        <h4 className="mb-5 text-lg font-medium">Price</h4>
        <Slider
          value={range}
          onValueChange={setRange}
          min={20}
          max={800}
          step={20}
          minStepsBetweenThumbs={1}
        />

        <p className="mt-3.5 text-sm text-gray-600 dark:text-gray-100">
          range:{" "}
          <span className="text-primary-400 font-bold">
            {toCurrency(range[0])} - {toCurrency(range[1])}
          </span>
        </p>

        <Button
          size={"sm"}
          variant="outline"
          className="float-right mt-3"
          onClick={() =>
            router.replace(
              `/shop?${createSearchParams({
                price_start: range[0].toString(),
                price_end: range[1].toString(),
              })}`,
            )
          }
        >
          Apply Price Range
        </Button>
      </div>
    </div>
  );
};