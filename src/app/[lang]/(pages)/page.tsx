import { dictMatcher } from "@/app/_lib/utils";
import { dict } from "@/app/_config/i18n/dashboard-dict";
import { PageHeader } from "@/app/_components/page-header";
import { DataCard } from "@/app/_components/dashboard/data-card";
import {
  TraficDonutChart,
  MonthlySalesBarChart,
  RevenuLineChart,
} from "@/app/_components/dashboard/charts";
import {
  BestSellersTable,
  LatestOrdersTable,
} from "@/app/_components/dashboard/tables";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  CreditCardIcon,
  ShoppingCartIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

export default function Home({ params }: { params: { lang: "en" | "ar" } }) {
  const { t } = dictMatcher(dict, params.lang);
  return (
    <>
      <PageHeader header={t("pageHeader")} />

      <div className="mb-8 grid w-full grid-cols-4 gap-4">
        <div className="col-span-full sm:col-span-2 lg:col-span-1">
          <DataCard
            label={t("dataCards").totalOrders}
            Icon={<ShoppingCartIcon />}
            count="421"
            colorVariant="green"
          />
        </div>
        <div className="col-span-full sm:col-span-2 lg:col-span-1">
          <DataCard
            label={t("dataCards").totalSales}
            Icon={<CreditCardIcon />}
            count="$21K"
            colorVariant="yellow"
          />
        </div>
        <div className="col-span-full sm:col-span-2 lg:col-span-1">
          <DataCard
            label={t("dataCards").newCustomers}
            Icon={<UserPlusIcon />}
            count="12"
          />
        </div>
        <div className="col-span-full sm:col-span-2 lg:col-span-1">
          <DataCard
            label={t("dataCards").usersOnline}
            Icon={<UsersIcon />}
            count="62"
            colorVariant="indigo"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-5 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-md">
              {t("charts").monthlySales}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] px-0 lg:h-[450px]">
            <MonthlySalesBarChart />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-md">
              {t("charts").trafficSource}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] min-h-[350px] lg:h-[450px]">
            <TraficDonutChart />
          </CardContent>
        </Card>
      </div>
      <div className="mb-14 grid grid-cols-6 justify-between gap-5">
        <Card className="col-span-full md:col-span-4">
          <CardHeader>
            <CardTitle className="text-md">{t("charts").revenue}</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] px-0 lg:h-[450px]">
            <RevenuLineChart />
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle className="text-md">{t("tables").bestSellers}</CardTitle>
          </CardHeader>
          <CardContent className="">
            <BestSellersTable />
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle className="text-md">{t("tables").latestOrders}</CardTitle>
        </CardHeader>
        <CardContent className="max-w-sm p-0 md:max-w-full md:p-6">
          <LatestOrdersTable />
        </CardContent>
      </Card>
    </>
  );
}
