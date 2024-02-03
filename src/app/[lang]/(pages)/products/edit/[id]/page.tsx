import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { PageHeader } from "@/app/_components/page-header";
import { EditProductForm } from "@/app/_components/products/edit-product-form";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
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
      <PageHeader header="Edit Product" />

      {/* @ts-ignore */}
      <EditProductForm productId={params.id} defaultValues={defaultValues} />
    </div>
  );
}
