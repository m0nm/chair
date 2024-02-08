"use client";

import { z } from "zod";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CouponFormSchema } from "@/app/_lib/zod";

import { dict } from "@/app/_config/i18n/coupons-dict";
import { dictMatcher } from "@/app/_lib/utils";
import { CouponDatePickers } from "@/app/_components/coupons/coupon-date-pickers";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

const formSchema = CouponFormSchema;

function onFormSubmit(
  method: "POST" | "PUT",
  data: z.infer<typeof formSchema> & { id?: string },
) {
  return fetch("/api/coupons", {
    method,
    body: JSON.stringify(data),
  });
}

type IProps = {
  mode: "create" | "edit";
  defaultValues?: z.infer<typeof formSchema>;
};

export const CouponForm = ({ defaultValues, mode }: IProps) => {
  const { id, lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en" | "ar");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      startingDate: new Date(),
      name: "",
      type: "FIXED",
      status: "ACTIVE",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { isDirty } = form.formState;

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (mode == "edit" && !isDirty) {
      toast.info("Nothing to update");
      return;
    }

    toast.promise(
      () =>
        onFormSubmit(mode == "edit" ? "PUT" : "POST", {
          ...data,
          id: id as string,
        }),
      {
        loading: (() => {
          setIsLoading(true);
          return <p>{mode == "edit" ? "Updating" : "Creating"} coupon...</p>;
        })(),
        success: () => {
          setTimeout(() => {
            setIsLoading(false);
            if (typeof window !== "undefined")
              window.location.href = "/coupons";
          }, 250);
          return (
            <p>Coupon {mode == "edit" ? "updated" : "created"} successfully</p>
          );
        },
        error: (error: string) => {
          setIsLoading(false);
          return error.includes("400")
            ? "Coupon already exists"
            : `Failed to ${
                mode == "edit" ? "update" : "create"
              } coupon, Please try again`;
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-8">
          <div className="mb-6">
            <h5 className="text-lg font-medium">
              {t("form").couponName.header}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("form").couponName.description}
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-1.5">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">
                    {t("form").couponName.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="max-w-lg"
                      id="name"
                      placeholder="ABCD"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-6">
            <h5 className="text-lg font-medium">
              {t("form").couponDetails.header}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("form").couponDetails.description}
            </p>
          </div>

          <div className="grid grid-cols-9 gap-10">
            <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="coupon-amount">
                      {t("form").couponDetails.amountLabel}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="coupon-amount"
                        className="max-w-md"
                        placeholder={"20"}
                        type={"number"}
                        min={0}
                        step="0.01"
                        inputMode="decimal"
                        pattern="[0-9]+([\.,][0-9]+)?"
                        onChange={
                          (e) =>
                            e.target.validity.valid &&
                            field.onChange(e.target.value) // e.target.validity.valid is required for pattern to work
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
              <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="coupon-type" className="col-span-2">
                      {t("form").couponDetails.typeLabel}
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(e) => field.onChange(e as "FIXED")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue id="coupon-type" placeholder="Fixed" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FIXED">Fixed</SelectItem>
                        <SelectItem value="PERCENT">Percent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="coupon-status" className="col-span-2">
                      {t("form").couponDetails.statusLabel}
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(e) =>
                        field.onChange(e.toUpperCase() as "ACTIVE")
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            id="coupon-status"
                            placeholder="Active"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <h5 className="text-lg font-medium">
              {t("form").couponDetails.header}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("form").couponDetails.description}
            </p>
          </div>

          <CouponDatePickers
            form={form}
            t={{
              expirationDateLabel:
                t("form").couponDateRange.expirationDateLabel,
              startingDateLabel: t("form").couponDateRange.startingDateLabel,
            }}
          />
        </div>

        <div className="my-6">
          <Button disabled={isLoading} className="float-right">
            {mode == "create" ? t("form").createButton : t("form").editButton}
          </Button>
        </div>
      </form>
    </Form>
  );
};
