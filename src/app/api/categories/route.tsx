import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await db.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const { name } = (await req.json()) as { name: string };

    const nameExist = await db.category.findUnique({ where: { name } });

    if (nameExist) {
      return NextResponse.json(
        { success: false, message: "Category already exists" },
        { status: 400 },
      );
    }

    await db.category.create({ data: { name } }).catch((e) => {
      console.error("e: ", e);
      throw e;
    });

    revalidateTag("categories");

    return NextResponse.json(
      { success: true, message: "Category created successfully" },
      { status: 201 },
    );
  } catch (e) {
    console.error("error: ", e);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { name, id } = (await req.json()) as { name: string; id: string };

    await db.category.update({ where: { id }, data: { name } }).catch((e) => {
      console.error("e: ", e);
      throw e;
    });

    revalidateTag("categories");

    return NextResponse.json(
      { success: true, message: "Category created successfully" },
      { status: 200 },
    );
  } catch (e) {
    console.error("error: ", e);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string };

    await db.category.delete({ where: { id } }).catch((e) => {
      console.error("error: ", e);
      throw e;
    });

    revalidateTag("categories");
    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (e) {
    console.error("error: ", e);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
