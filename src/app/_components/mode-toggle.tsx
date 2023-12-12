"use client";
import { Moon, SunDim } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/app/_components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      className="rounded-full p-2"
    >
      <SunDim className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
