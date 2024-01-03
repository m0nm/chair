import { ActiveFilters } from "@/app/_components/shop/active-filters";
import { Aside } from "@/app/_components/shop/aside";
import { ProductsSort } from "@/app/_components/shop/products-sort";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Product } from "@prisma/client";
import { MenuIcon } from "lucide-react";
import { ProductsLayout } from "@/app/_components/shop/products-layout";
import { ProductsGrid } from "@/app/_components/shop/products-grid";
import { ProductsList } from "@/app/_components/shop/product-list";

const categories = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "1",
    name: "All",
    _count: {
      products: 20,
    },
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "2",
    name: "HOT",
    _count: {
      products: 10,
    },
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "3",
    name: "NEW",
    _count: {
      products: 5,
    },
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "4",
    name: "ON SALE",
    _count: {
      products: 12,
    },
  },
];

const product: Product = {
  id: "1",
  name: "lorem8Cillum duis sunt minim et sunt magna et eiusmod dolor consequat dolor velit dolore.",
  description: `
  Eu officia enim laborum commodo enim irure enim irure. Dolore minim labore in nostrud duis mollit id. Sit nisi in proident dolore non enim non est magna enim ex minim. Qui incididunt ullamco eu elit dolor quis nisi est labore do magna.

Aliqua consectetur laborum nostrud dolore officia nulla et. Cupidatat aliqua Lorem ex elit ex incididunt eiusmod esse incididunt excepteur commodo amet Lorem. Est id velit anim laboris minim eu eu incididunt do labore. Qui veniam excepteur veniam enim. Voluptate ipsum elit reprehenderit elit aliquip in. Occaecat ad in amet mollit qui labore. Ea ea enim non nisi nostrud qui in sit nulla irure fugiat id quis qui.

Velit commodo culpa laboris est commodo consectetur qui eu esse tempor qui officia. Consectetur officia cupidatat cupidatat dolor aute cupidatat ex non nisi consequat ipsum quis Lorem. Esse fugiat anim excepteur sunt enim cupidatat minim velit. Dolore qui ut officia aliqua sint aliquip dolor enim exercitation dolore aliquip dolor fugiat sint. Magna ea pariatur exercitation ullamco voluptate pariatur non duis adipisicing ipsum adipisicing anim. Laborum consectetur aute cupidatat Lorem ut eu nulla et eu do officia magna reprehenderit.

Tempor elit dolor voluptate consectetur fugiat dolore. Eu reprehenderit et incididunt dolore reprehenderit est enim qui esse incididunt. Magna est Lorem officia labore commodo nulla ea adipisicing anim incididunt. Elit laborum incididunt veniam incididunt deserunt labore proident.
  
  `,
  price: 100,
  salePrice: 80,
  stock: 0,
  thumbnail: "/product.png",
  images: ["/product.png", "/product.png", "/product.png"],
  condition: "HOT",
  published: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  categoryId: "1",
};

function generateProducts() {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({ ...product, id: product.id + Math.random() });
  }
  return data;
}

function ProductsGridPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex gap-x-24">
      {/* sidebar */}
      <div className="w-1/3">
        <Aside categories={categories} />
      </div>
      {/* mobile sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon size={28} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Aside categories={categories} />
          </SheetContent>
        </Sheet>
      </div>

      {/*  */}
      <div>
        <div className="mb-8 inline-flex w-full items-center justify-between">
          <ProductsSort />
          <ProductsLayout />
        </div>
        {/* content */}
        <div>
          <ActiveFilters />
          {searchParams?.layout === "list" ? (
            <ProductsList products={generateProducts()} />
          ) : searchParams.layout === "four-columns" ? (
            <ProductsGrid columns="four" products={generateProducts()} />
          ) : (
            <ProductsGrid columns="three" products={generateProducts()} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsGridPage;
