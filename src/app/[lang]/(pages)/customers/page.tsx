import { CustomersTable } from "@/app/_components/customers/customers-table";
import { PageHeader } from "@/app/_components/page-header";
import { dict } from "@/app/_config/i18n/customers-dict";
import { dictMatcher } from "@/app/_lib/utils";

export default function CustomersPage({
  params,
}: {
  params: { lang: string };
}) {
  const { t } = dictMatcher(dict, params.lang as "en");
  return (
    <>
      <PageHeader header={t("pageHeader")} />
      <CustomersTable />
    </>
  );
}
