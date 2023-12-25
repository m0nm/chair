import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// type Dict<K extends string, T extends string | Object> = {
//   en: Record<K, T>;
//   ar: Record<K, T>;
// };

// export const dictMatcher = <K extends string, T extends string | Object>(
//   dict: Dict<K, T>,
//   locale: "en" | "ar",
// ) => {
//   function t(label: K) {
//     return dict[locale][label];
//   }
//   return { t };
// };

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
