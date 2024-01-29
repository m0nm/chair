import { CategoriesTable } from "@/app/_components/categories/categories-table";
import { CreateCategoryModal } from "@/app/_components/categories/create-category-modal";
import { PageHeader } from "@/app/_components/page-header";
import { db } from "@/app/_lib/prisma";

async function CategoriesPage() {
  const data = await db.category.findMany({
    include: { _count: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader header="Categories" />
        <CreateCategoryModal />
      </div>
      <CategoriesTable data={data} />
    </div>
  );
}

export default CategoriesPage;
