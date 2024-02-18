"use client";
import * as React from "react";
import { useNumberFieldState } from "react-stately";
import {
  type AriaNumberFieldProps,
  useLocale,
  useNumberField,
  useButton,
  type AriaButtonOptions,
} from "react-aria";

import { ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "../../_lib/utils";

export const NumberInput = ({
  className,
  ...props
}: {
  className?: string;
} & AriaNumberFieldProps) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = React.useRef(null);
  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  return (
    <div className={className}>
      <Label {...labelProps}>{props.label}</Label>
      <div className="grid h-10 grid-cols-[auto_2.3rem]" {...groupProps}>
        <Input
          {...inputProps}
          className={cn(
            inputProps.className,
            "row-span-2 h-full rounded-r-none border-r-0 text-center",
          )}
          ref={inputRef}
        />
        <AriaButton className="rounded-tr-md px-2" {...incrementButtonProps}>
          <ChevronUp className="mx-auto" size="1em" />
        </AriaButton>
        <AriaButton className="rounded-br-md  px-2 " {...decrementButtonProps}>
          <ChevronDown className="mx-auto" size="1em" />
        </AriaButton>
      </div>
    </div>
  );
};

const AriaButton = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & AriaButtonOptions<"button">) => {
  const ref = React.useRef(null);
  const { buttonProps } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      className={cn(buttonProps.className, className)}
      ref={ref}
    >
      {children}
    </button>
  );
};
