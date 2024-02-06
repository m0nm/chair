"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { BASE_URL } from "@/app/_config/base-url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { dictMatcher, throwError } from "@/app/_lib/utils";
import { edit_category_modal_dict as dict } from "@/app/_config/i18n/categories-dict";

import { EditIcon } from "lucide-react";
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

async function editCategory(id: string, name: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: "PUT",
      body: JSON.stringify({ name, id }),
    });

    return res.json();
  } catch (e) {
    throwError(e as Error);
  }
}

export const EditCategoryModal = ({
  defaultName,
  id,
}: {
  defaultName: string;
  id: string;
}) => {
  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.name === defaultName) return;

    toast.promise(editCategory(id, data.name), {
      loading: (() => {
        setIsLoading(true);
        return <p>Editing category...</p>;
      })(),
      success: () => {
        setTimeout(() => {
          if (typeof window !== "undefined") window.location.reload();
        }, 250);
        return `Category edited successfully to "${data.name}"`;
      },
      error: () => {
        setTimeout(() => {
          if (typeof window !== "undefined") window.location.reload();
        }, 250);
        return `Failed to edit category, Please try again`;
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <EditIcon size={18} />
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
                      <Input {...field} id="name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"secondary"}
                  disabled={isLoading}
                >
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
