import { PageHeader } from "@/app/_components/page-header";
import { Label } from "@/app/_components/ui/label";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { ImagePlus, Upload } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative grid grid-cols-6 gap-4 p-4">
      <div className="col-span-6 lg:col-span-4">
        <PageHeader header="Edit Product" />

        {/* product information */}
        <div>
          <div className="mb-6">
            <h5 className="text-lg font-medium">Basic information</h5>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Section to config basic product information
            </p>
          </div>

          {/* name */}
          <div className="flex flex-col gap-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="product-name">Product Name</Label>
              <Skeleton className="h-9 w-full" />
            </div>

            {/* desc */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="product-desc">Description</Label>
              <Skeleton className="h-32 w-full" />
            </div>
          </div>

          {/* product pricing */}
          <div className="mt-8">
            <div className="mb-6">
              <h5 className="text-lg font-medium">Pricing And Quanitity</h5>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Section to config product sales information
              </p>
            </div>

            <div className="mb-4 grid grid-cols-4 gap-16">
              {/* price */}
              <div className="col-span-4 lg:col-span-2">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="product-price">Price</Label>
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>

              <div className="col-span-4 lg:col-span-2">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="product-sale">
                    Discount <span className="text-xs">(optional)</span>
                  </Label>
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="product-stock">Stock</Label>
              <Skeleton className="h-9 w-full" />
            </div>
          </div>

          {/* organization*/}
          <div className="mt-8">
            <div className="mb-6">
              <h5 className="text-lg font-medium">Organizations</h5>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Section to config the product attribute
              </p>
            </div>

            {/* category */}
            <div className="mb-2 grid w-full gap-1.5">
              <Label htmlFor="product-category">Category</Label>
              <Skeleton className="h-9 w-full" />
            </div>

            <div className="grid grid-cols-4 gap-8">
              {/* condition */}
              <div className="col-span-4 grid w-full items-center gap-1.5 lg:col-span-2">
                <Label htmlFor="product-condition">Condition</Label>
                <Skeleton className="h-9 w-full" />
              </div>
              {/* status */}
              <div className="col-span-4 grid w-full items-center gap-1.5 lg:col-span-2">
                <Label htmlFor="product-status">Status</Label>
                <Skeleton className="h-9 w-full" />
              </div>
            </div>

            {/* product attributes */}
            <div className="py-4">
              <Label className="mb-1.5">
                Product Attributes <span className="text-xs">(optional)</span>
              </Label>

              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-6 py-1">
                  <div className="flex-1">
                    <Skeleton className="h-9 w-full" />
                  </div>

                  <div className="flex-1">
                    <Skeleton className="h-9 w-full" />
                  </div>

                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* images */}
      <div className="col-span-6 lg:col-span-2">
        <div className="mb-3">
          <h5 className="text-xl">Product images</h5>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Add or change image for the product
          </p>
        </div>

        <div>
          {/* thumbnail */}
          <div className="grid min-h-[10rem] place-content-center rounded-lg rounded-ee-none rounded-es-none border border-dashed bg-slate-100 py-3 transition-colors duration-150 hover:bg-slate-200 dark:bg-transparent">
            <div>
              <div className=" mb-2 grid place-content-center justify-center  ">
                <div className="mx-auto grid h-12 w-12 place-content-center rounded-md bg-transparent">
                  <Upload className="text-md font-bold " strokeWidth={3} />
                </div>

                <h4 className="text-center text-sm font-medium">
                  Upload Product Thumbnail
                </h4>
              </div>
            </div>

            <Skeleton className="mt-2 grid place-content-center border-4 border-dashed border-gray-300 text-xs text-gray-500 dark:border-gray-700">
              <div className="grid h-[250px] w-[250px] place-content-center">
                <span className="pointer-events-none select-none">
                  Thumbnail preview
                </span>
              </div>
            </Skeleton>
          </div>

          {/* images */}
          <div className="mt-4 grid min-h-[6rem] w-full place-content-center rounded-lg rounded-s-none rounded-se-none border border-dashed bg-slate-100 py-3 transition-colors duration-150 hover:bg-slate-200 dark:bg-transparent">
            <div>
              <Label htmlFor="images" className="h-32 w-full cursor-pointer">
                <div className="mb-3 flex w-full items-center opacity-75">
                  <ImagePlus
                    size={32}
                    className="mx-auto text-center text-zinc-800 dark:text-gray-50"
                  />
                </div>
                <h5 className="mt-2 text-center text-xs font-medium text-zinc-800 dark:text-gray-50">
                  Upload Product Images
                </h5>
              </Label>
            </div>

            <div className="mt-8 grid justify-center">
              <div>
                {[...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="my-2 grid h-24 w-24 place-content-center border-2 border-dashed border-gray-300 text-gray-500 dark:border-gray-700"
                  >
                    <span className="select-none text-[0.6rem]">
                      Image preview
                    </span>
                  </Skeleton>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
