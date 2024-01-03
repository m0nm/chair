"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { toCurrency } from "@/app/_lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Rating } from "../ui/rating";
import { EyeIcon, HeartIcon, ShoppingCartIcon } from "lucide-react";
import { ViewProduct } from "./view-product";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

export const HorizontalProductCard = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="group mb-20 flex w-full flex-col gap-8 px-4 py-8 lg:flex-row">
        <CardHeader className="relative w-full overflow-hidden group-hover:child-['#quickview']:opacity-100 lg:w-2/6">
          {/* quick view */}
          <div
            id="quickview"
            className="peer absolute inset-0 z-30 grid h-full w-full place-content-center bg-zinc-700/30 opacity-0 transition-all"
          >
            <Button
              className="scale-0 rounded-full text-black transition-transform duration-300 group-hover:scale-100 dark:bg-foreground dark:text-background"
              variant={"outline"}
              size={"icon"}
              onClick={() => setOpen(true)}
            >
              <EyeIcon size={20} />
            </Button>
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
                <Badge className="!borded-0 w-fit scale-95 bg-blue-500 outline-none hover:bg-blue-400">
                  New
                </Badge>
              )
            )}

            {/* product on sale */}
            {product.salePrice && (
              <Badge className="scale-95 !border-0 bg-orange-500 outline-none hover:bg-orange-400">
                ON SALE
              </Badge>
            )}
          </div>

          {/* out of stock */}
          {product.stock === 0 && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-background px-2 py-1 text-center text-xs font-medium shadow">
              Out Of Stock
            </div>
          )}

          {/* product image */}
          <div
            className={`absolute inset-0 flex h-fit w-[200%] whitespace-nowrap rounded bg-white transition-all duration-300 ${
              product.images[0] ? "peer-hover:-translate-x-1/2" : ""
            }`}
          >
            <div className="relative  h-80 w-1/2">
              <Image src={product.thumbnail} alt={product.name} fill />
            </div>

            {product.images[0] && (
              <div className="relative  h-80 w-1/2">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className={product.images[0] ? "" : "hidden"}
                />
              </div>
            )}
          </div>
        </CardHeader>

        {/* content */}
        <CardContent className="flex-1">
          <div className="mb-0.5">
            <Rating readOnly defaultRating={3.5} />
          </div>

          <h3 className="hover:text-primary-400 mb-3 text-2xl font-semibold duration-200">
            {product.name}
          </h3>

          {product.salePrice ? (
            <span className="text-lg font-medium text-zinc-700 dark:text-zinc-400">
              <del
                aria-hidden
                className="text-gray-400 first:mr-2 first:text-base"
              >
                <bdi>{toCurrency(product.price)}</bdi>
              </del>
              {toCurrency(product.salePrice)}
            </span>
          ) : (
            <span className="text-lg text-zinc-700 dark:text-zinc-400">
              {toCurrency(product.price)}
            </span>
          )}

          <div className="my-8 flex items-center gap-4">
            <Button variant="outline" size="lg">
              <Link href={`#`}>Read More</Link>
            </Button>

            <Button variant="outline" size="icon" className="h-full w-10 p-2">
              <ShoppingCartIcon />
            </Button>

            <Button variant="outline" size="icon" className="h-full w-10 p-2">
              <HeartIcon />
            </Button>
          </div>

          <p
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="line-clamp-4 leading-relaxed"
          ></p>
        </CardContent>
      </Card>
      <ViewProduct product={product} open={open} setOpen={setOpen} />
    </>
  );
};
