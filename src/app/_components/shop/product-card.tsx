"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@prisma/client";
import { cn, toCurrency } from "@/app/_lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { EyeIcon, HeartIcon, ShoppingCartIcon } from "lucide-react";
import { ViewProduct } from "./view-product";
import { Card, CardContent, CardHeader } from "../ui/card";

export function ProductCard({
  product,
  columns,
}: {
  product: Product;
  columns: "three" | "four";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="relative h-fit pb-2">
        <CardHeader className="group relative h-fit">
          {/* product images */}
          <div
            className={cn("group relative", {
              "h-72": columns === "three",
              "h-64": columns === "four",
            })}
          >
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className={cn(
                "visible absolute inset-0 opacity-100 transition-all",
                {
                  "group-hover:scale(1.1) group-hover:invisible group-hover:opacity-0":
                    product.images[0],
                },
              )}
            />

            {product.images[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={
                  product.images[0]
                    ? "invisible absolute inset-0  opacity-0 transition-all group-hover:visible group-hover:opacity-100"
                    : "hidden"
                }
              />
            )}
          </div>

          {/* product condition */}
          <div className="absolute left-4 top-4 z-20 grid space-y-1">
            {product.condition === "HOT" ? (
              <Badge
                variant="destructive"
                className="w-fit scale-95 !border-0 outline-none"
              >
                HOT
              </Badge>
            ) : (
              product.condition === "NEW" && (
                <Badge className="!borded-0 w-fit scale-95 bg-blue-500 text-white outline-none hover:bg-blue-400">
                  New
                </Badge>
              )
            )}

            {/* product on sale */}
            {product.salePrice && (
              <Badge className="scale-95 !border-0  outline-none ">
                ON SALE
              </Badge>
            )}
          </div>

          {/* product actions */}
          <div className="absolute right-4 top-4 w-fit">
            <div
              title="Add to wishlist"
              className="mb-2 grid h-5 w-5 translate-x-10 cursor-pointer place-content-center rounded-full border border-transparent bg-white p-4 opacity-0 transition-all delay-75 duration-300 hover:border-red-500 hover:!text-red-500 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black"
            >
              <HeartIcon size={20} />
            </div>

            <div
              title="view product"
              className="mb-2 grid h-5 w-5 translate-x-10 cursor-pointer place-content-center rounded-full border border-transparent bg-white p-4 opacity-0 transition-all delay-200 duration-300 hover:border-blue-500 hover:!text-blue-500 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black"
              onClick={() => setOpen(true)}
            >
              <EyeIcon size={20} />
            </div>
          </div>

          {/* out of stock */}
          {product.stock === 0 && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-background px-2 py-1 text-center text-xs font-medium shadow">
              Out Of Stock
            </div>
          )}

          {/* add to cart */}
          {product.stock !== 0 && (
            <Button
              variant={"secondary"}
              className="absolute bottom-4 left-1/2 w-4/5 -translate-x-1/2 translate-y-4 gap-1 opacity-0 transition-all duration-300 group-hover:-translate-y-5 group-hover:opacity-100 "
            >
              Add To Cart
              <ShoppingCartIcon size={16} />
            </Button>
          )}
        </CardHeader>

        {/* content */}
        <CardContent className="mt-4">
          <h3 className="text-md mb-2 line-clamp-2 font-medium">
            {product.name}
          </h3>

          {product.salePrice ? (
            <p>
              <span className="mr-1 text-xl font-bold text-foreground">
                {toCurrency(product.salePrice)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {toCurrency(product.price)}
              </span>
            </p>
          ) : (
            <span className="text-xl font-bold text-foreground">
              {toCurrency(product.price)}
            </span>
          )}
        </CardContent>
      </Card>
      <ViewProduct open={open} setOpen={setOpen} product={product} />
    </>
  );
}
