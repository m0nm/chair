import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { PageHeader } from "@/app/_components/page-header";
import { EditProductForm } from "@/app/_components/products/edit-product-form";
import { dictMatcher } from "@/app/_lib/utils";
import { edit_product_page_dict as dict } from "@/app/_config/i18n/products-dict";

export const metadata = {
  title: "Chair | Edit Product",
};

export default async function EditProductPage({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const { t } = dictMatcher(dict, params.lang as "en");

  const product = await db.product.findUnique({
    where: { id: params.id },
    include: { category: true, attributes: true },
  });

  if (!product) return notFound();

  const defaultValues = {
    ...product,
    salePrice: product.salePrice ?? "",
    attributes: product.attributes,
    category: {
      label: product.category?.name,
      value: product.category?.name,
    },
  };

  return (
    <div>
      <PageHeader header={t("pageHeader")} />

      {/* @ts-ignore */}
      <EditProductForm productId={params.id} defaultValues={defaultValues} />
    </div>
  );
}
