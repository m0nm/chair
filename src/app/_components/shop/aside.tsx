"use client";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { cn, toCurrency } from "../../_lib/utils";

const conditions = [
  { label: "HOT", value: "hot" },
  { label: "NEW", value: "new" },
  { label: "ON SALE", value: "on_sale" },
];

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
      router.replace(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  const deleteCategorySearchParam = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    router.replace(`?${params.toString()}`);
  }, [searchParams, router]);

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
              onClick={() => deleteCategorySearchParam()}
            >
              All
            </Button>
          </li>

          {categories.map((c) => (
            <li key={c.id}>
              <Button
                variant={"link"}
                className={cn(
                  "hover:text-primary-600 hover:dark:text-primary-400 text-gray-600 !no-underline dark:text-gray-100",
                  searchParams.get("category") === c.name &&
                    "!text-black dark:!text-primary",
                )}
                onClick={() => createSearchParams({ category: c.name })}
              >
                {c.name} ({c._count.products})
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* condition */}
      <div>
        <h4 className="mb-4 text-lg font-medium">Condition</h4>
        <ul className="space-y-2">
          {conditions.map((c, i) => (
            <li key={i}>
              <Button
                variant={"link"}
                className={cn(
                  "hover:text-primary-600 hover:dark:text-primary-400 text-gray-600 !no-underline dark:text-gray-100",
                  searchParams.get("condition") === c.value &&
                    "!text-black dark:!text-primary",
                )}
                onClick={() => createSearchParams({ condition: c.value })}
              >
                {c.label}
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
            createSearchParams({
              price_start: range[0].toString(),
              price_end: range[1].toString(),
            })
          }
        >
          Apply Price Range
        </Button>
      </div>
    </div>
  );
};
