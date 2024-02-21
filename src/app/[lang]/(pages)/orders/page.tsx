import { LatestOrdersTable } from "@/app/_components/dashboard/tables";
import { PageHeader } from "@/app/_components/page-header";
import { dict } from "@/app/_config/i18n/orders-dict";
import { dictMatcher } from "@/app/_lib/utils";

export default function OrdersPage({ params }: { params: { lang: string } }) {
  const { t } = dictMatcher(dict, params.lang as "en");

  return (
    <div>
      <PageHeader header={t("pageHeader")} />
      <LatestOrdersTable />
    </div>
  );
}
