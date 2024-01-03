"use client";
import { Product } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { toCurrency } from "@/app/_lib/utils";
import { Button } from "../ui/button";
import { Rating } from "../ui/rating";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function ViewProduct({
  product,
  open,
  setOpen,
}: {
  product: Product;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[80vh] w-screen max-w-4xl !p-0">
        <div className="grid h-full w-full grid-flow-row grid-cols-2 gap-6">
          {/* images */}
          <div className="col-span-1">
            <Carousel>
              <CarouselContent className="h-[80vh]">
                {[product.thumbnail].concat(product.images).map((img) => (
                  <CarouselItem key={img}>
                    <div
                      className="h-full w-full bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-12" />
              <CarouselNext className="right-12" />
            </Carousel>
          </div>

          {/* contetn */}
          <div className="col-span-1 pt-10">
            <h3 className="mb-3 text-2xl font-medium">{product.name}</h3>
            {/*  customer review */}
            <Rating readOnly defaultRating={4} />

            {product.salePrice ? (
              <span className="text-primary-400 text-2xl">
                <del
                  aria-hidden
                  className="!text-gray-400 first:mr-2 first:text-xl"
                >
                  <bdi>{toCurrency(product.price)}</bdi>
                </del>
                {toCurrency(product.salePrice)}
              </span>
            ) : (
              <span className="text-primary-400 text-2xl">
                {toCurrency(product.price)}
              </span>
            )}

            <ScrollArea className="h-52 py-4">
              <p
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="my-10 pr-1 text-sm text-gray-600 dark:text-gray-400"
              ></p>
            </ScrollArea>

            <p className="mb-4">
              Only{" "}
              <span className="text-primary-500">{product.stock} item(s)</span>{" "}
              left in stock!
            </p>

            <div className="mb-4 flex w-full items-center gap-2 pr-4">
              <Button className="flex-1">
                Add To Cart {<ShoppingCartIcon size={18} className="ml-2" />}
              </Button>
              <Button className="flex-1" variant="outline">
                Add To Wishlist {<HeartIcon size={18} className="ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
