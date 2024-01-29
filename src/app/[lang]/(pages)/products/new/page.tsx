"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema } from "@/app/_lib/zod";

import { toast } from "sonner";
import { PageHeader } from "@/app/_components/page-header";
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

const formSchema = ProductFormSchema;
const defaultValues = {
  name: "",
  description: "",
  stock: 1,
  published: true,
  attributes: [{ label: "Colors", value: ["red", "blue"] }],
};

async function createProduct(data: FormData) {
  return fetch("/api/products", {
    method: "POST",
    body: data,
  });
}

export default function NewProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => defaultValues, []),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data: ", data);
    const formData = new FormData();

    for (const key in data) {
      if (key === "images" && data.images) {
        data.images?.forEach((img) => {
          formData.append("images", img);
        });
        continue;
      } else if (key === "attributes" && data.attributes) {
        data.attributes?.forEach((attribute) => {
          formData.append("attributes", JSON.stringify(attribute));
        });
        continue;
      } else if (key === "category" && data.category) {
        formData.append("category", data.category.value);
        continue;
      } else if (data[key as "name"]) formData.set(key, data[key as "name"]);
    }

    toast.promise(async () => createProduct(formData), {
      loading: (() => {
        setIsLoading(true);
        return <p>Creating product...</p>;
      })(),
      success: () => {
        setTimeout(() => {
          setIsLoading(false);
          if (typeof window !== "undefined") window.location.href = "/products";
        }, 250);
        return <p>Product created successfully</p>;
      },
      error: () => {
        setIsLoading(false);
        return <p>Could not create product, Please try again</p>;
      },
    });
  }

  return (
    <div>
      <PageHeader header="New Product" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <h5 className="text-lg font-medium">
                      Pricing And Quanitity
                    </h5>
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
                              <FormLabel htmlFor="product-price">
                                Price
                              </FormLabel>
                              <FormMessage />
                              <FormControl>
                                <Input
                                  {...field}
                                  id="product-price"
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
                              <FormLabel htmlFor="product-sale">
                                Sale Price{" "}
                                <span className="text-xs">(optional)</span>
                              </FormLabel>
                              <FormMessage />
                              <FormControl>
                                <Input
                                  {...field}
                                  id="product-sale"
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
                            <FormLabel htmlFor="product-stock">Stock</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="product-stock"
                                type={"number"}
                                min={0}
                              />
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
                                  <SelectItem value="REGULAR">
                                    Regular
                                  </SelectItem>
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
                <ImageUploadForm control={form.control} />
              </CardContent>
            </Card>
            {/* action buttons */}
            <div className="sticky -bottom-1 z-50 col-span-6 bg-transparent py-3 ">
              <div className="float-right flex w-fit items-center justify-end gap-2">
                <Button
                  disabled={isLoading}
                  variant="secondary"
                  className="border dark:border-none"
                >
                  <Link href={"/products"}>Discard</Link>
                </Button>
                <Button disabled={isLoading}>Create</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
