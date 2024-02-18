import Image from "next/image";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const CartSummary = ({
  data,
  t,
}: {
  data: {
    id: number | string;
    name: string;
    quantity: number;
    image: string;
    price: number;
  }[];
  t: (key: "total" | "pageHeader" | "subtotal" | "checkout") => string;
}) => {
  const subtotal = data.reduce((acc, item) => acc + item.price, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{t("total")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-lg">
          <p>{t("subtotal")}</p>
          <span>${subtotal}</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        <Button className="w-full"> {t("checkout")}</Button>

        <div className="mt-8 text-center text-sm">
          <span className="hidden text-muted-foreground dark:inline">
            We Accept
          </span>
          <Image
            src="/payments.png"
            alt="payment methods"
            width={300}
            height={100}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
