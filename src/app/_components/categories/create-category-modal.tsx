"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { BASE_URL } from "@/app/_config/base-url";
import { zodResolver } from "@hookform/resolvers/zod";
import { dictMatcher, throwError } from "@/app/_lib/utils";
import { create_category_modal_dict as dict } from "@/app/_config/i18n/categories-dict";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  name: z.string({ required_error: "Category name is required" }).min(1, {
    message: "Category name is required",
  }),
});

async function createCategory(name: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    return res.json();
  } catch (e) {
    throwError(e as Error);
  }
}

export const CreateCategoryModal = () => {
  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en" | "ar");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    toast.promise(createCategory(data.name), {
      loading: (() => {
        setIsLoading(true);
        return <p>Creating category...</p>;
      })(),
      success: () => {
        setTimeout(() => {
          if (typeof window !== "undefined") window.location.reload();
        }, 250);
        return `Category ${data.name} created`;
      },
      error: () => {
        setTimeout(() => {
          if (typeof window !== "undefined") window.location.reload();
        }, 250);
        return `Failed to create category, Please try again`;
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon size={16} className="ltr:mr-2 rtl:ml-2" />
          {t("triggerButton")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("header")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("inputLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        placeholder={t("inputPleaceholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"secondary"} disabled={isLoading}>
                  {t("cancelButton")}
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {t("submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
