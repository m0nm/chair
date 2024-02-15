import Link from "next/link";
import { db } from "@/app/_lib/prisma";
import { CouponsTable } from "@/app/_components/coupons/coupons-table";
import { PageHeader } from "@/app/_components/page-header";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { dict } from "@/app/_config/i18n/coupons-dict";
import { dictMatcher } from "@/app/_lib/utils";

export const metadata = {
  title: "Chair | View Coupons",
};

const CouponsPage = async ({ params }: { params: { lang: string } }) => {
  const data = await db.coupon.findMany();
  const { t } = dictMatcher(dict, params.lang as "en");

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader header={t("pageHeader")} />
        <Link href="/coupons/new">
          <Button>
            <PlusIcon size={16} className="ltr:mr-2 rtl:ml-2" />
            {t("newButton")}
          </Button>
        </Link>
      </div>

      <CouponsTable data={data} />
    </div>
  );
};

export default CouponsPage;
