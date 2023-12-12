"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "../_lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import {
  Package,
  Home,
  Receipt,
  Users,
  SquareStack,
  LucideIcon,
  Percent,
  ChevronLeftIcon,
  ChevronRightIcon,
  LogInIcon,
  UserPlusIcon,
  FileIcon,
  UsersIcon,
  TableIcon,
  BarChart2Icon,
  MapPinIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ITEMS = [
  { label: "MAIN" },
  { label: "Dashboard", icon: Home, link: "/" },
  {
    label: "Products",
    icon: Package,
    link: "/products",
    subItems: [
      {
        label: "View Products",
        link: "/products",
      },
      {
        label: "Products Grid",
        link: "/products/grid",
      },
      {
        label: "Product Details",
        link: "/products/details",
      },
      {
        label: "New Product",
        link: "/products/new",
      },
    ],
  },
  {
    label: "Orders",
    icon: Receipt,
    link: "/orders",
    subItems: [
      {
        label: "View Orders",
        link: "/orders",
      },
      {
        label: "Order Details",
        link: "/orders/details",
      },
    ],
  },
  { label: "Customers", icon: Users, link: "/customers" },
  {
    label: "Categories",
    icon: SquareStack,
    link: "/categories",
    subItems: [
      {
        label: "View Categories",
        link: "/categories",
      },
      {
        label: "New Category",
        link: "/categories/new",
      },
    ],
  },

  {
    label: "Coupons",
    icon: Percent,
    link: "/coupons",
    subItems: [
      {
        label: "View Coupons",
        link: "/coupons",
      },
      {
        label: "New Coupon",
        link: "/coupons/new",
      },
    ],
  },
  { label: "PAGES" },
  {
    label: "PAGES",
    icon: FileIcon,
    link: "/blank",
    subItems: [
      { label: "Blank", link: "/blank" },
      { label: "404", link: "/404" },
      { label: "500", link: "/500" },
      { label: "Profile", link: "/profile" },
      { label: "Cart", link: "/cart" },
    ],
  },
  {
    label: "Auth",
    icon: UsersIcon,
    link: "/login",
    subItems: [
      { label: "Login", icon: LogInIcon, link: "/login" },
      { label: "Sign Up", icon: UserPlusIcon, link: "/sign-up" },
    ],
  },
  { label: "COMPONENTS" },
  {
    label: "Data Tables",
    icon: TableIcon,
    link: "/data-tables",
  },
  {
    label: "Charts",
    icon: BarChart2Icon,
    link: "/charts",
  },
  {
    label: "Maps",
    icon: MapPinIcon,
    link: "/maps",
  },
];

export const Sidebar = () => {
  const [expanded, setExpand] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    if (isTabletOrMobile) setExpand(false);
  }, [isTabletOrMobile]);

  return (
    <aside
      className={cn(
        expanded ? "w-56" : "!w-[53px]",
        "sticky inset-0 !z-50 flex h-screen w-56 flex-shrink-0 flex-col border bg-background pr-4 pt-4 font-normal transition-all duration-200 ease-in-out dark:bg-slate-900/80",
      )}
      aria-label="Sidebar"
    >
      <ToggleSidebarButton expanded={expanded} setExpand={setExpand} />

      <ScrollArea>
        <div className="flex h-20 justify-center">
          <Link href="/" className={cn("inline-block", !expanded && "ml-3")}>
            <Image
              priority
              src={"/logo.png"}
              width={120}
              height={80}
              alt="chair logo"
              draggable={false}
            />
          </Link>
        </div>

        <ul>
          {ITEMS.map((item) => {
            return !(item.icon && item.link) ? (
              <li
                key={item.label}
                className={cn(
                  !expanded && "hidden",
                  "ml-4 select-none pb-1 pt-3 text-xs text-foreground",
                )}
              >
                {item.label}
              </li>
            ) : (
              <li
                key={item.label}
                title={item.label}
                className={cn(
                  !expanded && "px-2",
                  "ml-2 flex min-h-[2.5rem] cursor-pointer items-center rounded-lg px-1 pb-3 text-gray-600 shadow-sm hover:bg-gray-100 dark:text-foreground dark:hover:bg-neutral-600",
                )}
              >
                {item.subItems ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full flex-1"
                  >
                    <CollapseItem
                      label={item.label}
                      Icon={item.icon}
                      link={item.link}
                      subItems={item.subItems}
                    />
                  </Accordion>
                ) : (
                  <SingleItem
                    key={item.label}
                    link={item.link}
                    label={item.label}
                    Icon={item.icon}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </aside>
  );
};

type SingleItemProps = {
  Icon: LucideIcon;
  label: string;
  link: string;
};

type CollapseItemProps = SingleItemProps & {
  subItems: { label: string; link: string }[];
};

function CollapseItem({ link, Icon, label, subItems }: CollapseItemProps) {
  return (
    <AccordionItem value={label} className="!border-b-0">
      <AccordionTrigger className="w-full rounded-lg p-0">
        <SingleItem link={link} Icon={Icon} label={label} />
      </AccordionTrigger>

      <AccordionContent className="text-xs text-gray-600 dark:text-gray-200">
        <br />
        {subItems.map((subItem) => (
          <li
            key={subItem.label}
            className="ml-6 list-item h-8 list-inside list-disc"
          >
            <Link href={subItem.link}>
              <span className="pl-3 hover:text-gray-500">{subItem.label}</span>
            </Link>
          </li>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function SingleItem({ Icon, label, link }: SingleItemProps) {
  return (
    <Link
      href={link}
      className="flex w-full items-center gap-4 text-sm font-semibold"
    >
      {<Icon size={20} />}

      {label}
    </Link>
  );
}

function ToggleSidebarButton({
  setExpand,
  expanded,
}: {
  expanded: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Button
      title={expanded ? "shrink sidebar" : "expand sidebar"}
      onClick={() => setExpand((p) => !p)}
      variant={"outline"}
      size={"icon"}
      className="absolute -right-4 top-[51%] z-10 h-8 w-8 rounded-full border-0 bg-foreground text-center  text-background"
    >
      {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </Button>
  );
}
