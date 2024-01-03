import { Product } from "@prisma/client";
import { cn } from "@/app/_lib/utils";
import { ProductCard } from "./product-card";

type IProps = {
  products: Product[];
  columns: "three" | "four";
};

export const ProductsGrid = ({ products, columns }: IProps) => {
  return (
    <div
      className={cn(
        "grid grid-flow-row grid-cols-2 gap-3 px-4 pb-8 child:mb-24 lg:gap-x-6 lg:gap-y-10 lg:child:mb-0",
        {
          "lg:grid-cols-3 ": columns === "three",
          " lg:grid-cols-4 lg:gap-y-14": columns === "four",
        },
      )}
    >
      {!products.length && (
        <p className="!col-span-full mx-auto mt-14 !h-36 self-center justify-self-center text-center align-middle">
          No products found.
        </p>
      )}

      {products.map((p) => (
        <div key={p.id}>
          <ProductCard product={p} columns={columns} />
        </div>
      ))}
    </div>
  );
};
