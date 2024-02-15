import { PageHeader } from "@/app/_components/page-header";
import { ProductsTable } from "@/app/_components/products/products-table";
import { Button } from "@/app/_components/ui/button";
import { dict } from "@/app/_config/i18n/products-dict";
import { db } from "@/app/_lib/prisma";
import { dictMatcher } from "@/app/_lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Chair | View Products",
};

export default async function ProductsPage({
  params,
}: {
  params: { lang: string };
}) {
  const data = await db.product.findMany({ include: { category: true } });
  const { t } = dictMatcher(dict, params.lang as "en");

  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader header={t("pageHeader")} />
        <Link href={`/${params.lang}/products/new`}>
          <Button>
            <PlusIcon size={16} className="ltr:mr-2 rtl:ml-2" />
            {t("newProductButton")}
          </Button>
        </Link>
      </div>
      <ProductsTable data={data} />
    </>
  );
}
