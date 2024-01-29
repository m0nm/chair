"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { dict } from "../_config/i18n/sidebar-dict";
import { useMediaQuery } from "react-responsive";

import { cn, dictMatcher } from "../_lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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
} from "lucide-react";

const ITEMS = [
  { label: "main" },
  { label: "dashboard", icon: Home, link: "/" },
  {
    label: "products",
    icon: Package,
    link: "/products",
    subItems: [
      {
        label: "viewProducts",
        link: "/products",
      },
      {
        label: "productDetails",
        link: "/products/details",
      },
      {
        label: "newProduct",
        link: "/products/new",
      },
    ],
  },
  {
    label: "orders",
    icon: Receipt,
    link: "/orders",
    subItems: [
      {
        label: "viewOrders",
        link: "/orders",
      },
      {
        label: "orderDetails",
        link: "/orders/details",
      },
    ],
  },
  { label: "customers", icon: Users, link: "/customers" },
  {
    label: "categories",
    icon: SquareStack,
    link: "/categories",
  },

  {
    label: "coupons",
    icon: Percent,
    link: "/coupons",
    subItems: [
      {
        label: "viewCoupons",
        link: "/coupons",
      },
      {
        label: "newCoupon",
        link: "/coupons/new",
      },
    ],
  },
  { label: "pages" },
  {
    label: "pages",
    icon: FileIcon,
    link: "/blank",
    subItems: [
      { label: "blank", link: "/blank" },
      {
        label: "shop",
        link: "/shop",
      },
      { label: "profile", link: "/profile" },
      { label: "cart", link: "/cart" },
      { label: "error404", link: "/404" },
      { label: "error500", link: "/500" },
    ],
  },
  {
    label: "auth",
    icon: UsersIcon,
    link: "/login",
    subItems: [
      { label: "login", icon: LogInIcon, link: "/login" },
      { label: "signUp", icon: UserPlusIcon, link: "/sign-up" },
    ],
  },
];

export const Sidebar = () => {
  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en");

  const [expanded, setExpand] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    if (isTabletOrMobile) setExpand(false);
  }, [isTabletOrMobile]);

  return (
    <aside
      className={cn(
        expanded ? "w-56" : "!w-0 !p-0",
        "sticky inset-0 z-50 flex h-screen w-56 flex-col border bg-background pr-4 pt-4 font-normal transition-all duration-200 ease-in-out dark:border-0",
      )}
      aria-label="Sidebar"
    >
      <ToggleSidebarButton expanded={expanded} setExpand={setExpand} />

      <ScrollArea>
        <div className="flex h-20 justify-center">
          <Link
            href={"/" + lang}
            className={cn("inline-block", !expanded && "ml-3")}
          >
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
                key={`label-${item.label}`}
                className={cn(
                  !expanded && "hidden",
                  "ml-4 select-none pb-1 pt-3 text-xs text-foreground rtl:text-right",
                )}
              >
                {t(item.label as "main")}
              </li>
            ) : (
              <li
                key={item.label}
                title={item.label}
                className={cn(
                  !expanded && "px-2",
                  "my-1 ml-2 flex min-h-[2.5rem] cursor-pointer items-center rounded-lg px-1 text-gray-600 shadow-sm hover:bg-gray-100 dark:text-foreground dark:hover:bg-neutral-600",
                )}
              >
                {item.subItems ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full flex-1 pt-2"
                  >
                    <CollapseItem
                      link={"/" + lang + item.link}
                      Icon={item.icon}
                      label={t(item.label as "main")}
                    >
                      {item.subItems.map((subItem) => (
                        <li
                          dir={lang == "ar" ? "rtl" : "ltr"}
                          key={subItem.label}
                          className="ml-6 list-item h-6 list-inside list-disc"
                        >
                          <Link href={subItem.link}>
                            <span className="pl-3 hover:text-gray-500">
                              {t(subItem.label as "main")}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </CollapseItem>
                  </Accordion>
                ) : (
                  <SingleItem
                    key={item.label}
                    link={"/" + lang + item.link}
                    label={t(item.label as "main")}
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
  children: ReactNode;
};

function CollapseItem({ children, label, link, Icon }: CollapseItemProps) {
  return (
    <AccordionItem value={label} className="!border-b-0">
      <AccordionTrigger className="w-full rounded-lg p-0 ">
        <SingleItem link={link} Icon={Icon} label={label} />
      </AccordionTrigger>

      <AccordionContent className="text-xs text-gray-600 rtl:text-right dark:text-gray-200">
        <br />
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

function SingleItem({ Icon, label, link }: SingleItemProps) {
  return (
    <Link
      href={link}
      className="flex w-full items-center gap-4 text-sm font-semibold rtl:flex-row-reverse"
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
      className="absolute -right-4 top-[51%] z-10 h-8 w-8 rounded-full border-0 bg-foreground text-center text-background  rtl:right-[95%] rtl:-scale-x-100"
    >
      {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </Button>
  );
}
