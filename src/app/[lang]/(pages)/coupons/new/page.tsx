import { PageHeader } from "@/app/_components/page-header";
import { CouponForm } from "@/app/_components/coupons/coupon-form";
import { dict } from "@/app/_config/i18n/coupons-dict";
import { dictMatcher } from "@/app/_lib/utils";

export default function NewCouponPage({
  params,
}: {
  params: { lang: string };
}) {
  const { t } = dictMatcher(dict, params.lang as "en");

  return (
    <>
      <PageHeader header={t("newCouponPageHeader")} />
      <CouponForm mode="create" />
    </>
  );
}
