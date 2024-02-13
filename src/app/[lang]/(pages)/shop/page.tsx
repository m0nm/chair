import { db } from "@/app/_lib/prisma";
import { ActiveFilters } from "@/app/_components/shop/active-filters";
import { Aside } from "@/app/_components/shop/aside";
import { ProductsSort } from "@/app/_components/shop/products-sort";
import { ProductsLayout } from "@/app/_components/shop/products-layout";
import { ProductsGrid } from "@/app/_components/shop/products-grid";
import { ProductsList } from "@/app/_components/shop/product-list";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { MenuIcon } from "lucide-react";
import { Prisma } from "@prisma/client";
import { ProductsPagination } from "@/app/_components/shop/products-pagination";

type SearchParams = {
  layout?: string;
  sort_by?: "default" | "price_asc" | "price_desc" | "latest";
  condition?: "on_sale" | "new" | "hot";
  category?: string;
  price_start?: string;
  price_end?: string;
  page?: string;
};

const PAGE_SIZE = 10;

async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const productSort: Prisma.ProductOrderByWithRelationInput = {
    ...(searchParams.sort_by === "price_asc" && { price: "asc" }),
    ...(searchParams.sort_by === "price_desc" && { price: "desc" }),
    ...(searchParams.sort_by === "latest" && { updatedAt: "desc" }),
  };

  const productFilters: Prisma.ProductWhereInput = {
    ...(searchParams.condition &&
      (searchParams.condition == "on_sale"
        ? { salePrice: { not: null } }
        : {
            condition: searchParams.condition.toUpperCase() as "NEW",
          })),

    ...(searchParams.price_start &&
      searchParams.price_end && {
        price: {
          gte: parseFloat(searchParams.price_start),
          lte: parseFloat(searchParams.price_end),
        },
      }),

    ...(searchParams.category && {
      category: {
        name: searchParams.category,
      },
    }),
  };

  const productsCount = await db.product.count({ where: productFilters });
  const products = await db.product.findMany({
    where: productFilters,
    orderBy: productSort,
    take: PAGE_SIZE,
    skip:
      searchParams.page && searchParams.page !== "1"
        ? PAGE_SIZE * (Number(searchParams.page) - 1)
        : undefined,
    include: { category: true },
  });
  const categories = await db.category.findMany({
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="flex gap-x-16">
      {/* sidebar */}
      <div className="w-1/4">
        <Aside categories={categories} />
      </div>
      {/* mobile sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon size={28} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Aside categories={categories} />
          </SheetContent>
        </Sheet>
      </div>

      {/*  */}
      <div className="w-3/4">
        <div className="mb-8 inline-flex w-full items-center justify-between">
          <ProductsSort />
          <ProductsLayout />
        </div>
        {/* content */}
        <div>
          <ActiveFilters />
          {searchParams?.layout === "list" ? (
            <ProductsList products={products} />
          ) : searchParams.layout === "four-columns" ? (
            <ProductsGrid columns="four" products={products} />
          ) : (
            <ProductsGrid columns="three" products={products} />
          )}

          {productsCount > PAGE_SIZE && (
            <ProductsPagination
              totalCount={productsCount}
              pageSize={PAGE_SIZE}
              currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
