import { CategoriesTable } from "@/app/_components/categories/categories-table";
import { CreateCategoryModal } from "@/app/_components/categories/create-category-modal";
import { PageHeader } from "@/app/_components/page-header";
import { BASE_URL } from "@/app/_config/base-url";
import { Category } from "@prisma/client";

async function CategoriesPage() {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    next: { tags: ["categories"] },
  });

  const data = (await res.json()) as Category[];

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
