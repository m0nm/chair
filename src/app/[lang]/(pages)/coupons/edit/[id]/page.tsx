"use server";
import { db } from "@/app/_lib/prisma";
import { z } from "zod";
import { CouponFormSchema } from "@/app/_lib/zod";
import { PageHeader } from "@/app/_components/page-header";
import { CouponForm } from "@/app/_components/coupons/coupon-form";
import { dict } from "@/app/_config/i18n/coupons-dict";
import { dictMatcher } from "@/app/_lib/utils";

export default async function EditCouponPage({
  params,
}: {
  params: { id: string; lang: string };
}) {
  const data = (await db.coupon.findUnique({
    where: {
      id: params.id,
    },
  })) as z.infer<typeof CouponFormSchema>;

  const { t } = dictMatcher(dict, params.lang as "en");

  return (
    <>
      <PageHeader header={t("editCouponPageHeader")} />
      <CouponForm mode="edit" defaultValues={data} />
    </>
  );
}
