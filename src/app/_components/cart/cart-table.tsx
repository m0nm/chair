import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { NumberInput } from "../ui/number-input";

export const CartTable = ({
  data,
}: {
  data: {
    id: number | string;
    name: string;
    quantity: number;
    image: string;
    price: number;
  }[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12">
                  <Image
                    src={item.image}
                    alt="product image"
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <h5 className="font-bold">{item.name}</h5>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <NumberInput
                defaultValue={item.quantity}
                minValue={1}
                step={1}
                formatOptions={{ maximumFractionDigits: 0 }}
                className="w-24"
              />
            </TableCell>
            <TableCell>
              <div className="text-right">$ {item.quantity * item.price}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
