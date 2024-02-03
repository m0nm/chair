import { db } from "@/app/_lib/prisma";
import { uploadFile } from "@/app/_lib/utils.server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.product.findMany().catch((error) => {
      console.error(error);
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    let productData: Prisma.ProductCreateInput = {
      description: "",
      name: "",
      price: 0,
      thumbnail: "",
    };

    // append form data
    formData.forEach((value, key) => {
      if (key === "thumbnail" || key === "images") {
        return;
      } else if (key === "price" || key === "salePrice" || key === "stock") {
        productData[key] = parseFloat(value as string);
        return;
      } else if (key === "condition" && value) {
        productData.condition = value as "NEW";
        return;
      } else if (key === "published") {
        productData.published = value === "true";
        return;
      } else if (key === "category" && typeof value == "string") {
        productData.category = {
          connectOrCreate: {
            where: {
              name: value,
            },
            create: {
              name: value,
            },
          },
        };
      } else if (key === "attributes") {
        productData.attributes = { create: JSON.parse(value as string) };
        return;
      } else productData[key as "name"] = value as string;
    });

    //****************** thumbnail and images upload ********************************
    const thumbnail = formData.get("thumbnail") as File;
    const images = formData.getAll("images") as File[];

    if (thumbnail) {
      const thumbnailPath = await uploadFile(thumbnail, "products");
      productData.thumbnail = thumbnailPath as string;
    }

    if (images) {
      const imagesPath: string[] = [];

      for (const image of Array.from(images)) {
        const imagePath = await uploadFile(image, "products");
        if (imagePath) imagesPath.push(imagePath);
      }

      if (imagesPath.length) productData["images"] = imagesPath;
    }

    // ******************** save to db ******************
    await db.product
      .create({
        data: productData,
        include: { attributes: true, category: true },
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });

    revalidatePath("/products");

    return NextResponse.json(
      { message: "Product created", success: true },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Could not create the product", success: false, error },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string };

    await db.product.delete({ where: { id } }).catch((e) => {
      console.error("error: ", e);
      throw e;
    });

    revalidatePath("/products");

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.error("error: ", e);
    return NextResponse.json(
      { success: false, message: "Could not delete the product", error: e },
      { status: 500 },
    );
  }
}
