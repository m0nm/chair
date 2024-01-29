import { PageHeader } from "@/app/_components/page-header";
import { ProductsTable } from "@/app/_components/products/products-table";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const data = await db.product.findMany({ include: { category: true } });

  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader header="Products" />
        <Link href="/products/new">
          <Button>
            <PlusIcon size={16} className="mr-2" />
            New Product
          </Button>
        </Link>
      </div>
      <ProductsTable data={data} />
    </>
  );
}
