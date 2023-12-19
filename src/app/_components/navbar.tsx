"use client";

import { createContext, useContext } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { dictMatcher } from "../_lib/utils";
import { dict } from "../_config/i18n/navbar-dict";

import {
  BellIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  User,
  Moon,
  SunDim,
  CreditCardIcon,
  LanguagesIcon,
} from "lucide-react";
import {
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const context = createContext<any>(null);

export const Navbar = () => {
  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en");

  return (
    <nav className="flex w-full items-center justify-between border-b bg-white px-8 py-4 dark:border-b-gray-800 dark:bg-transparent">
      <context.Provider value={{ t }}>
        <Searchbar />

        <div className="flex items-center gap-2">
          <LangSwitch />
          <ThemeModeToggle />
          <NotificationDropdown />
          <ProfileDropdown />
        </div>
      </context.Provider>
    </nav>
  );
};

export function ThemeModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      className="-mr-2 text-muted-foreground"
    >
      <SunDim className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon
        size={20}
        className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function ProfileDropdown() {
  const { t } = useContext(context);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-xs text-muted-foreground">
        <Avatar>
          <AvatarImage src="/avatar.png" />
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-12 p-2 rtl:ml-12">
        <DropdownMenuItem className="gap-3 text-sm">
          <Avatar>
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <span>{t("profileMenu").name}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4 rtl:ml-2" />
          <span>{t("profileMenu").profile}</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <CreditCardIcon className="mr-2 h-4 w-4 rtl:ml-2" />
          <span>{t("profileMenu").billing}</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <SettingsIcon className="mr-2 h-4 w-4 rtl:ml-2" />
          <span>{t("profileMenu").settings}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon className="mr-2 h-4 w-4 rtl:ml-2" />
          <span>{t("profileMenu").logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationDropdown() {
  const { t } = useContext(context);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex text-xs text-muted-foreground"
      >
        <Button size={"icon"} variant={"ghost"} className="relative">
          <BellIcon size={20} />
          <div className="absolute right-2 top-0 flex h-0.5 w-0.5 translate-y-1 justify-center rounded-full bg-pink-500 p-1"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="mr-20 p-0 rtl:ml-20 ">
        <DropdownMenuLabel className="text-md flex items-center justify-between p-4 rtl:flex-row-reverse rtl:text-right">
          <span>{t("notificationMenu").label}</span>
          <Badge>{t("notificationMenu").badge}</Badge>
        </DropdownMenuLabel>

        <DropdownMenuItem className="!p-0">
          <NotificationItem
            subText="check your orders to..."
            header="You Have A New Order"
          />
        </DropdownMenuItem>

        <DropdownMenuItem className="!p-0">
          <NotificationItem subText="lorem ipsum" header="Product Added" />
        </DropdownMenuItem>

        <DropdownMenuItem className="!p-0">
          <NotificationItem
            subText="lorem ipsum "
            header="Update Your Settings"
          />
        </DropdownMenuItem>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({
  header,
  subText,
}: {
  header: string;
  subText: string;
}) {
  return (
    <a className="relative w-full flex-1" href="#">
      <div className="flex w-full flex-1 flex-row flex-wrap items-center  border-b border-gray-200 py-2 last:border-b-0 hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-900 dark:bg-opacity-40 dark:hover:bg-opacity-20">
        <div className="w-16 max-w-full flex-shrink px-2 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary p-2 text-muted-foreground">
            {<BellIcon />}
          </div>
        </div>
        <div className="max-w-full flex-1 px-2">
          <div className="text-sm font-semibold">{header}</div>
          <span className="text-xs text-muted-foreground">{subText}</span>
          <div className="mt-1 text-sm text-muted-foreground">1h ago</div>
        </div>
      </div>
    </a>
  );
}

function LangSwitch() {
  const { lang } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const switcher = (to: "ar" | "en") => {
    const newPathname = pathname.replace(lang as string, to);
    router.replace(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="-mr-2 text-muted-foreground"
        >
          <LanguagesIcon size={22} />
          <span className="sr-only">change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switcher("en")}>EN</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switcher("ar")}>AR</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Searchbar() {
  const { t } = useContext(context);
  return (
    <form className="relative">
      <input
        className="h-10 rounded-3xl border px-5 pr-16 text-sm focus:outline-none dark:border-0"
        type="search"
        name="search"
        placeholder={t("searchbar").placeholder}
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <SearchIcon className="text-muted-foreground" size={22} />
      </button>
    </form>
  );
}
