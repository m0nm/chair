"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "@/app/_config/base-url";
import { dictMatcher, throwError } from "@/app/_lib/utils";
import { delete_category_modal_dict as dict } from "@/app/_config/i18n/categories-dict";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

async function deleteCategory(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    return res.json();
  } catch (e) {
    throwError(e as Error);
  }
}

export const DeleteCategoryModal = ({ id }: { id: string }) => {
  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en" | "ar");

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    toast.promise(deleteCategory(id), {
      loading: (() => {
        setIsLoading(true);
        return <p>Deleting category...</p>;
      })(),
      success: () => {
        setTimeout(() => {
          if (typeof window !== "undefined") window.location.reload();
        }, 250);
        return `Category deleted successfully`;
      },
      error: () => {
        setTimeout(() => {
          if (typeof window !== "undefined") window.location.reload();
        }, 250);
        return `Failed to delete category, Please try again`;
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"destructive"}>
          <TrashIcon size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{t("header")}</AlertDialogTitle>
        <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {t("cancelButton")}
          </AlertDialogCancel>
          <Button
            type="button"
            variant={"destructive"}
            disabled={isLoading}
            onClick={onClick}
          >
            {t("submitButton")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
