import { Product } from "@prisma/client";
import { HorizontalProductCard } from "./horizontal-product-card";

export const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <>
      {!products.length && (
        <p className="mx-auto mt-20  self-center justify-self-center text-center align-middle">
          No products found.
        </p>
      )}

      {products.map((p) => (
        <HorizontalProductCard product={p} key={p.id} />
      ))}
    </>
  );
};
