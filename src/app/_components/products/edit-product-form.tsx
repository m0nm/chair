"use client";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { useState } from "react";

import * as z from "zod";
import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema } from "@/app/_lib/zod";

import { toast } from "sonner";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import { Editor } from "@/app/_components/products/editor";
import { ProductCategorySelector } from "@/app/_components/products/product-category-selector";
import { ImageUploadForm } from "@/app/_components/products/image-upload-form";
import { ProductAttributes } from "@/app/_components/products/product-attributes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

type Product = Prisma.ProductGetPayload<{
  include: { category: { select: { name: true } }; attributes: true };
}>;

const formSchema = ProductFormSchema.merge(
  z.object({
    thumbnail: z
      .string()
      .or(z.instanceof(File, { message: "Thumbnail is required" })),
    images: z.array(z.string().or(z.instanceof(File))).optional(),
  }),
);

async function editProduct(data: FormData, id: string) {
  return fetch(`/api/products/${id}`, {
    method: "PUT",
    body: data,
  });
}

export function EditProductForm({
  defaultValues,
  productId,
}: {
  defaultValues: DefaultValues<z.infer<typeof formSchema>>;
  productId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { dirtyFields, isDirty } = form.formState;

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data: ", data);
    console.log("dirtyFields: ", dirtyFields);
    if (!isDirty) {
      toast.info("Nothing to update");
      return;
    }

    const formData = new FormData();

    for (const key in dirtyFields) {
      // only add modified fields
      if (key == "category") {
        dirtyFields.category?.value &&
          formData.set("category", data.category.value);
        continue;
      } else if (key === "attributes") {
        data.attributes?.forEach((attribute, i) => {
          // @ts-ignore
          if (!dirtyFields.attributes?.[i].label) return;
          formData.append("attributes", JSON.stringify(attribute));
        });
        continue;
      } else if (key === "images") {
        dirtyFields.images &&
          data.images &&
          data.images.forEach((img) => {
            formData.append(`images`, img);
          });
        continue;
      } else if (dirtyFields[key as "name"]) {
        formData.set(key, data[key as "name"] as string);
      }
    }
    toast.promise(async () => editProduct(formData, productId), {
      loading: (() => {
        setIsLoading(true);
        return <p>Updating product...</p>;
      })(),
      success: () => {
        setTimeout(() => {
          setIsLoading(false);
          if (typeof window !== "undefined") window.location.href = "/products";
        }, 250);
        return <p>Product updated successfully</p>;
      },
      error: () => {
        setIsLoading(false);
        return <p>Could not update product, Please try again</p>;
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="relative grid grid-cols-6 gap-4 p-4">
          <div className="col-span-6 lg:col-span-4">
            <div>
              {/* product information */}
              <Card>
                <CardHeader className="mb-6">
                  <h5 className="text-lg font-medium">Basic information</h5>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-300">
                    Section to config basic product information
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  {/* name */}
                  <div className="grid w-full items-center gap-1.5">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="product-name">
                            Product Name
                          </FormLabel>
                          <FormMessage />

                          <FormControl>
                            <Input
                              {...field}
                              id="product-name"
                              placeholder="Name"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* desc */}
                  <div className="grid w-full items-center gap-1.5">
                    <FormField
                      name="description"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="product-desc">
                            Description
                          </FormLabel>
                          <FormMessage />
                          <FormControl>
                            {/* @ts-ignore */}
                            <Editor field={field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              {/* product pricing and stock */}
              <Card className="mt-8">
                <CardHeader className="mb-6">
                  <h5 className="text-lg font-medium">Pricing And Quanitity</h5>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-300">
                    Section to config product sales information
                  </CardDescription>
                </CardHeader>
                <CardContent className="mb-4 grid grid-cols-4 gap-12">
                  {/* price */}
                  <div className="col-span-4 lg:col-span-2">
                    <div className="grid w-full items-center gap-1.5">
                      <FormField
                        name="price"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormMessage />
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="100"
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
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-2">
                    <div className="grid w-full items-center gap-1.5">
                      <FormField
                        name="salePrice"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Sale Price{" "}
                              <span className="text-xs">(optional)</span>
                            </FormLabel>
                            <FormMessage />
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="100"
                                type={"number"}
                                min={0}
                                step="0.01"
                                inputMode="numeric"
                                pattern="[0-9]+([\.,][0-9]+)?"
                                onChange={
                                  (e) =>
                                    e.target.validity.valid &&
                                    field.onChange(e.target.value) // e.target.validity.valid is required for pattern to work
                                }
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-4 grid w-full items-center gap-1.5">
                    <FormField
                      name="stock"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormMessage />
                          <FormControl>
                            <Input {...field} type={"number"} min={0} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              {/* organization*/}
              <Card className="mt-8">
                <CardHeader className="mb-6">
                  <h5 className="text-lg font-medium">Organizations</h5>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-300">
                    Section to config the product attribute
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 grid grid-cols-4 gap-8">
                    {/* condition */}
                    <div className="col-span-4 grid w-full items-center gap-1.5 lg:col-span-2">
                      <FormField
                        name="condition"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="product-condition">
                              Condition
                            </FormLabel>
                            <FormMessage />
                            <Select
                              onValueChange={(e) =>
                                field.onChange(e.toUpperCase() as "NEW")
                              }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    id="product-condition"
                                    placeholder="Regular"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="REGULAR">Regular</SelectItem>
                                <SelectItem value="NEW">New</SelectItem>
                                <SelectItem value="HOT">Hot</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* status */}
                    <div className="col-span-4 grid w-full items-center gap-1.5 lg:col-span-2">
                      <FormField
                        name="published"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="product-status">
                              Status
                            </FormLabel>
                            <FormMessage />
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={"true"}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    id="product-status"
                                    placeholder="Published"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={"true"}>
                                  Published
                                </SelectItem>
                                <SelectItem value={"false"}>
                                  Archived
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* category */}
                  <ProductCategorySelector control={form.control} />
                  {/* product attributes */}
                  <div className="py-4">
                    {<ProductAttributes control={form.control} />}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* images */}
          <Card className="col-span-6 lg:col-span-2">
            <CardHeader className="mb-3">
              <CardTitle className="text-lg font-medium">
                Product images
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-300">
                Add or change image for the product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploadForm
                resetField={form.resetField}
                control={form.control}
                defaultThumnbail={defaultValues.thumbnail as string}
                defaultImages={defaultValues.images as string[]}
              />
            </CardContent>
          </Card>
          {/* action buttons */}
          <div className="sticky -bottom-1 z-50 col-span-6 bg-transparent py-3 ">
            <div className="float-right flex w-fit items-center justify-end gap-2">
              <Button
                type="button"
                disabled={isLoading}
                variant="secondary"
                className="border dark:border-none"
              >
                <Link href={"/products"}>Discard</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
