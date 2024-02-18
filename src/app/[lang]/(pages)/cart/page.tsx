import { CartSummary } from "@/app/_components/cart/cart-summary";
import { CartTable } from "@/app/_components/cart/cart-table";
import { PageHeader } from "@/app/_components/page-header";
import { dict } from "@/app/_config/i18n/cart-dict";
import { dictMatcher } from "@/app/_lib/utils";

const cartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 220,
    quantity: 3,
    image: "/wooden-chair.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 108,
    quantity: 7,
    image: "/wooden-chair.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 80,
    quantity: 1,
    image: "/wooden-chair.jpg",
  },
];

export default function CartPage({ params }: { params: { lang: string } }) {
  const { t } = dictMatcher(dict, params.lang as "en");

  return (
    <div>
      <PageHeader header={t("pageHeader")} />

      <div className="grid grid-cols-6 justify-center gap-8">
        <div className="col-span-6 lg:col-span-4">
          <CartTable data={cartItems} />
        </div>

        <div className="col-span-6 lg:col-span-2">
          <CartSummary data={cartItems} t={t} />
        </div>
      </div>
    </div>
  );
}
