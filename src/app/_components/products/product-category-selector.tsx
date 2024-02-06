"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Control } from "react-hook-form";
import { BASE_URL } from "@/app/_config/base-url";
import { dictMatcher } from "@/app/_lib/utils";
import { new_product_page_dict as dict } from "@/app/_config/i18n/products-dict";

import { AutoComplete, Option } from "../ui/autocomplete";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export const ProductCategorySelector = ({
  control,
}: {
  control: Control<any>;
}) => {
  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en" | "ar");

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
            <FormLabel htmlFor="product-category">
              {t("productOrganization").categoryLabel}
            </FormLabel>

            <FormControl>
              <AutoComplete
                options={categories}
                onValueChange={field.onChange}
                value={field.value}
                isLoading={isLoading}
                placeholder={t("productOrganization").categoryInputPlaceholder}
                emptyMessage={t("productOrganization").categoryEmptyMessage}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
