"use client";
import { DirectionProvider as RadixDIrProvider } from "@radix-ui/react-direction";
import { ReactNode } from "react";

export function DirectionProvider({
  dir,
  children,
}: {
  dir: "ltr" | "rtl";
  children: ReactNode;
}) {
  return <RadixDIrProvider dir={"rtl"}>{children}</RadixDIrProvider>;
}
