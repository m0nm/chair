import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .min(1, "Product name is required"),
  description: z
    .string({ required_error: "Product description is required" })
    .min(1, "Product description is required"),

  price: z
    .number({ required_error: "Product price is required" })
    .or(z.string().min(1, "Product price is required"))
    .pipe(
      z.coerce
        .number({ required_error: "Product price is required" })
        .min(0, "Product price cannot be less than 0"),
    ),
  salePrice: z
    .number()
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Product sale price is required" })
        .min(0, "Product sale price cannot be less than 0"),
    )
    .optional(),
  stock: z
    .number()
    .int()
    .or(z.string())
    .default(1)
    .pipe(
      z.coerce
        .number({ required_error: "Product stock is required" })
        .min(0, "Product stock cannot be less than 0"),
    ),

  thumbnail: z.instanceof(File, { message: "Product thumbnail is required" }),
  images: z.array(z.instanceof(File)).optional().nullable(),

  condition: z.enum(["NEW", "HOT", "REGULAR"]).optional().default("REGULAR"),
  published: z.boolean().default(true),

  category: z.object(
    { label: z.string(), value: z.string() },
    { required_error: "Category is required" },
  ),
  attributes: z
    .array(
      z.object({
        id: z.string().optional().nullable(),
        label: z.string().min(1, "Attribute name is required"),
        value: z.string().array().nonempty("At least one value is required"),
      }),
    )
    .optional()
    .nullable(),
});

export const CouponFormSchema = z
  .object({
    name: z
      .string({ required_error: "Coupon name is required" })
      .min(1, "Coupon name is required"),
    amount: z
      .number({ required_error: "Coupon amount is required" })
      .or(z.string().min(1, "Coupon amount is required"))
      .pipe(z.coerce.number({ required_error: "Coupon amount is required" })),
    type: z.enum(["FIXED", "PERCENT"]).default("FIXED"),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
    startingDate: z.coerce
      .date()
      .refine((data) => data.getDate() >= new Date().getDate(), {
        message: "Start date must be now or in the future",
      })
      .default(new Date()),

    expirationDate: z.date({
      required_error: "Coupon expiration date is required",
    }),
  })
  .refine((d) => d.expirationDate >= d.startingDate, {
    message: "Expiration date must be after the starting date.",
    path: ["expirationDate"],
  });
