import { db } from "@/app/_lib/prisma";
import { dictMatcher } from "@/app/_lib/utils";
import { dict } from "@/app/_config/i18n/categories-dict";
import { CategoriesTable } from "@/app/_components/categories/categories-table";
import { CreateCategoryModal } from "@/app/_components/categories/create-category-modal";
import { PageHeader } from "@/app/_components/page-header";

async function CategoriesPage({ params }: { params: { lang: string } }) {
  const { t } = dictMatcher(dict, params.lang as "en");

  const data = await db.category.findMany({
    include: { _count: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader header={t("pageHeader")} />
        <CreateCategoryModal />
      </div>
      <CategoriesTable data={data} />
    </div>
  );
}

export default CategoriesPage;
