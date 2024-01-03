import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Dict<T> = {
  en: T;
  ar: T;
};

export const dictMatcher = <T>(dict: Dict<T>, locale: "en" | "ar") => {
  function t<K extends keyof T>(label: K): T[K] {
    const nestedValue = dict[locale][label];
    return nestedValue as T[K];
  }
  return { t };
};

export function toCurrency(value: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(value);
}

export function throwError(e: Error) {
  if (e instanceof ZodError) {
    throw {
      status: "error",
      message: "Invalid form data.",
      errors: e.issues.map((issue) => ({
        path: issue.path.join("."),
        message: `${issue.message}`,
      })),
    };
  }
  throw {
    status: "error",
    message: "Something went wrong. Please try again.",
  };
}
