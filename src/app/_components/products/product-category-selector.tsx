"use client";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { BASE_URL } from "@/app/_config/base-url";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AutoComplete, Option } from "../ui/autocomplete";

export const ProductCategorySelector = ({
  control,
}: {
  control: Control<any>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Option[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        const optionData = data.map((item) => ({
          label: item.name as string,
          value: item.name as string,
        }));
        setCategories(optionData);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="col-span-4 grid w-full items-center gap-1.5 lg:col-span-2">
      <FormField
        name="category"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="product-category">Category</FormLabel>

            <FormControl>
              <AutoComplete
                options={categories}
                onValueChange={field.onChange}
                value={field.value}
                placeholder="Type category name"
                emptyMessage="No categories found"
                isLoading={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
