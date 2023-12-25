import { ReactNode } from "react";
import { cva } from "class-variance-authority";

type IProps = {
  label: string;
  count: string;
  Icon: ReactNode;
  colorVariant?: "pink" | "yellow" | "green" | "indigo";
};

const cardVariants = cva(
  "relative flex h-14 w-14 items-center dark:bg-opacity-40 justify-center self-center rounded-full text-center",
  {
    variants: {
      color: {
        pink: "bg-pink-100 text-center text-pink-500 dark:bg-pink-900 ",
        yellow: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900 ",
        green: "text-green-500 bg-green-100 dark:bg-green-900 ",
        indigo: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900 ",
      },
    },
    defaultVariants: {
      color: "pink",
    },
  },
);

export const DataCard = ({ count, Icon, label, colorVariant }: IProps) => {
  return (
    <div className="w-full">
      <div className="h-full rounded-lg bg-white shadow-lg dark:bg-background">
        <div className="relative px-6 pt-6 text-sm font-semibold">
          {label}
          <div className="text-green-500 ltr:float-right rtl:float-left">
            +{(Math.random() * 100).toFixed(0)}%
          </div>
        </div>
        <div className="flex flex-row justify-between px-6 py-4">
          <div className={cardVariants({ color: colorVariant })}>{Icon}</div>
          <h2 className="self-center text-3xl">{count}</h2>
        </div>
        <div className="px-6 pb-6">
          <a className="text-sm hover:text-indigo-500" href="#">
            View more...
          </a>
        </div>
      </div>
    </div>
  );
};
