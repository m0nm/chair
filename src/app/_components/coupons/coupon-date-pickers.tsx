"use client";

import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CouponFormSchema } from "@/app/_lib/zod";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { DatePicker } from "../ui/date-picker";

export const CouponDatePickers = ({
  form,
  t,
}: {
  form: UseFormReturn<z.infer<typeof CouponFormSchema>>;
  t: {
    startingDateLabel: string;
    expirationDateLabel: string;
  };
}) => {
  const [startingDate, expirationDate] = form.watch([
    "startingDate",
    "expirationDate",
  ]);

  const disabledExpireDates = useMemo(
    () => ({ before: startingDate }),
    [startingDate],
  );

  return (
    <div className="grid grid-cols-9 justify-start gap-10">
      <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
        <FormField
          name="startingDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="coupon-start">
                {t.startingDateLabel}
              </FormLabel>
              <DatePicker
                disabled={{ before: new Date() }}
                selectedDay={startingDate}
                setSelectedDay={(e) => {
                  if (e) {
                    field.onChange(e);
                  }
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-9 flex flex-col gap-1.5 lg:col-span-3">
        <FormField
          name="expirationDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="coupon-start">
                {t.expirationDateLabel}
              </FormLabel>
              <DatePicker
                selectedDay={expirationDate}
                setSelectedDay={(e) => {
                  if (e) {
                    field.onChange(e);
                  }
                }}
                disabled={disabledExpireDates}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
