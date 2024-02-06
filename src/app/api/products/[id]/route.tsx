import { db } from "@/app/_lib/prisma";
import { uploadFile } from "@/app/_lib/utils.server";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const product = await db.product.findUnique({ where: { id } });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Could not find the product",
      error: error,
    });
  }
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
  try {
    const formData = await req.formData();
    let productData: Prisma.ProductUpdateInput = {};

    // append form data
    formData.forEach((value, key) => {
      if (key === "thumbnail" || key === "images") {
        return;
      } else if (key === "price" || key === "salePrice" || key === "stock") {
        productData[key] = parseFloat(value as string);
        return;
      } else if (key === "category") {
        if (typeof value == "string") {
          productData.category = {
            connect: { id: value },
          };
        }
        return;
      } else if (key === "attributes") {
        productData.attributes = {
          upsert: {
            where: {
              id: JSON.parse(value as string).id || "",
            },
            update: JSON.parse(value as string),
            create: JSON.parse(value as string),
          },
        };
        return;
      } else productData[key as "name"] = value as string;
    });

    //****************** thumbnail and images upload ********************************
    const thumbnail = formData.get("thumbnail") as File;
    const images = formData.getAll("images") as File[];

    if (thumbnail && typeof thumbnail !== "string") {
      const thumbnailPath = await uploadFile(thumbnail, "products");
      productData.thumbnail = thumbnailPath as string;
    }

    if (images) {
      const imagesPath: string[] = [];
      for (const image of Array.from(images)) {
        const imagePath = await uploadFile(image, "products");
        if (imagePath) imagesPath.push(imagePath);
      }

      productData.images = imagesPath;
    }

    // ******************** update changes to db ******************
    await db.product
      .update({
        where: { id: ctx.params.id },
        data: productData,
        include: { attributes: true, category: true },
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });

    return NextResponse.json(
      { message: "Product updated successfully", success: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update the product", success: false, error },
      { status: 500 },
    );
  }
}
