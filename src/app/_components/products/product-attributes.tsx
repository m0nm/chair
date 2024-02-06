"use client";
import { useParams } from "next/navigation";
import { Control, useFieldArray } from "react-hook-form";
import { dictMatcher } from "@/app/_lib/utils";
import { new_product_page_dict as dict } from "@/app/_config/i18n/products-dict";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TagInput } from "../ui/tag-input";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type IProps = {
  control: Control<any>;
};

export const ProductAttributes = ({ control }: IProps) => {
  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en" | "ar");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  return (
    <div>
      <div>
        <FormLabel htmlFor="attributes">
          {t("productOrganization").productAttributesLabel}
          <span className="text-xs">(optional)</span>
        </FormLabel>
        <div className="mt-2 space-y-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid w-full flex-1 grid-cols-7 items-center gap-2"
            >
              <FormField
                control={control}
                name={`attributes.${index}.label`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        {...field}
                        id="attributes"
                        className="h-12"
                        placeholder={
                          t("productOrganization")
                            .productAttributesLabelInputPlaceholder
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`attributes.${index}.value`}
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormControl>
                      <TagInput
                        id="attributes"
                        defaultTags={field.value}
                        onTagsChange={(tags) => {
                          field.onChange(tags);
                        }}
                        placeholder={
                          t("productOrganization")
                            .productAttributesValueInputPlaceholder
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant={"destructive"}
                size={"icon"}
                className="col-span-1 scale-90 rounded-full"
                onClick={() => remove(index)}
              >
                <TrashIcon size={21} />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-2 w-full flex-1 gap-2 font-medium"
          onClick={() => append({ label: "", value: [] })}
        >
          <PlusIcon size={16} />
          {t("productOrganization").newAttributeButton}
        </Button>
      </div>
    </div>
  );
};
