"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImagePlusIcon, UploadIcon, X } from "lucide-react";
import { Button } from "../ui/button";

import type { Control, UseFormResetField } from "react-hook-form";
import { FormItem, FormField, FormControl, FormLabel } from "../ui/form";
import { dictMatcher } from "@/app/_lib/utils";
import { new_product_page_dict as dict } from "@/app/_config/i18n/products-dict";

type Iprops = {
  defaultThumnbail?: string;
  defaultImages?: string[];
  control: Control<any, any>;
  resetField: UseFormResetField<any>;
};

export const ImageUploadForm = ({
  control,
  defaultImages,
  defaultThumnbail,
  resetField,
}: Iprops) => {
  const { lang } = useParams();
  const { t } = dictMatcher(dict, lang as "en" | "ar");

  const [thumbnail, setThumbnail] = useState<string[]>(
    defaultThumnbail ? [defaultThumnbail] : [],
  );
  const [images, setImages] = useState<string[]>(defaultImages ?? []);

  function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (e.target.id === "thumbnail") {
        const url = URL.createObjectURL(files[0]);
        setThumbnail([url]);
      } else {
        const urls = files.map((file) => URL.createObjectURL(file));
        setImages(urls);
      }

      e.target.value = "";
    }
  }

  return (
    <div>
      {/* thumbnail */}
      <div className="grid min-h-[10rem] place-content-center rounded-lg rounded-ee-none rounded-es-none border border-dashed py-3 transition-colors duration-150 ">
        <div>
          <FormField
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="thumbnail"
                  className="h-32 w-full cursor-pointer"
                >
                  <div className=" mb-2 grid place-content-center justify-center">
                    <div className="mx-auto grid h-12 w-12 place-content-center rounded-md bg-transparent">
                      <UploadIcon
                        className="text-md font-bold "
                        strokeWidth={3}
                      />
                    </div>

                    <h4 className="text-center text-sm font-medium">
                      {t("productImages").thumbnailLabel}
                    </h4>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={"file"}
                    accept="image/*"
                    id="thumbnail"
                    className="hidden"
                    value={field.value?.fileName}
                    onChange={(e) => {
                      if (e.target.files) {
                        field.onChange(e.target.files?.[0]);
                        onFileSelected(e);
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {thumbnail.length > 0 ? (
          <div className="z-20">
            <ImagePreview
              isThumnail
              reset={() => {}}
              images={thumbnail}
              setImages={setThumbnail}
              width="250px"
              height="250px"
            />
          </div>
        ) : (
          <div className="mt-2 grid place-content-center border-4 border-dashed border-gray-300 text-xs text-gray-500 dark:border-gray-700">
            <div className="grid h-[250px] w-[250px] place-content-center">
              <span className="pointer-events-none select-none">
                {t("productImages").thumbnailPreview}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* images */}
      <div className=" mt-4 grid min-h-[6rem] w-full place-content-center rounded-lg rounded-s-none rounded-se-none border border-dashed  py-3 transition-colors duration-150 ">
        <div>
          <FormField
            name="images"
            control={control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="images" className="h-32 w-full cursor-pointer">
                  <div className="mb-3 flex w-full items-center opacity-75">
                    <ImagePlusIcon
                      size={32}
                      className="mx-auto text-center text-zinc-800 dark:text-gray-50"
                    />
                  </div>
                  <h5 className="mt-2 text-center text-xs font-medium text-zinc-800 dark:text-gray-50">
                    {t("productImages").imagesLabel}
                  </h5>
                </Label>

                <FormControl>
                  <Input
                    {...field}
                    multiple
                    type={"file"}
                    accept="image/*"
                    id="images"
                    className="hidden"
                    value={""}
                    onChange={(e) => {
                      if (e.target.files) {
                        field.onChange(Array.from(e.target.files));
                        onFileSelected(e);
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-8 grid justify-center">
          {images.length > 0 ? (
            <ImagePreview
              reset={() => resetField("images")}
              images={images}
              setImages={setImages}
              width="96px"
              height="96px"
            />
          ) : (
            <div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="my-2 grid h-24 w-24 place-content-center border-2 border-dashed border-gray-300 text-gray-500 dark:border-gray-700"
                >
                  <span className="select-none text-[0.6rem]">
                    {t("productImages").imagesPreview}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type IProps = {
  reset(): void;
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  width: string;
  height: string;
  isThumnail?: boolean;
};

function ImagePreview({
  reset,
  images,
  setImages,
  width,
  height,
  isThumnail,
}: IProps) {
  function onRemoveImage(url: string) {
    if (isThumnail) return;
    setImages((p) => p.filter((image) => image !== url));
    reset();
  }

  return (
    <div className="">
      {images.map((image) => {
        return (
          <div
            key={image}
            style={{ width, height }}
            className="relative my-2 aspect-video rounded-sm border-4 border-dashed border-gray-300"
          >
            {!isThumnail && (
              <Button
                type="button"
                title="remove"
                size={"icon"}
                variant={"destructive"}
                className="absolute right-0 top-0 z-20 h-4 w-4 -translate-y-1/2 translate-x-1/3 rounded-full font-medium text-white"
                onClick={() => onRemoveImage(image)}
              >
                <X />
              </Button>
            )}

            <Image
              src={image}
              alt={"product image"}
              className="object-fill"
              fill
            />
          </div>
        );
      })}
    </div>
  );
}
