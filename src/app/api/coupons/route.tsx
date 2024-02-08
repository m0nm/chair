import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as Prisma.CouponCreateInput;

    const couponExist = await db.coupon.findFirst({
      where: {
        name: data.name,
      },
    });

    if (couponExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Coupon already exists",
        },
        { status: 400 },
      );
    }

    await db.coupon.create({ data }).catch((e) => {
      console.error("error: ", e);
      throw e;
    });

    revalidatePath("/coupons");
    return NextResponse.json(
      {
        success: true,
        message: "Coupon created successfully",
      },
      { status: 204 },
    );
  } catch (e) {
    console.error("error: ", e);
    return NextResponse.json(
      {
        success: false,
        message: "Could not create the coupon",
        error: e,
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = (await req.json()) as Prisma.CouponUpdateInput & {
      id: string;
    };

    const couponExist = await db.coupon.findFirst({
      where: {
        name: data.name as string,
        AND: {
          NOT: {
            id: data.id,
          },
        },
      },
    });

    if (couponExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Coupon already exists",
        },
        { status: 400 },
      );
    }

    await db.coupon.update({ where: { id: data.id }, data }).catch((e) => {
      console.error("error: ", e);
      throw e;
    });

    revalidatePath("/coupons");
    return NextResponse.json({
      success: true,
      message: "Coupon updated successfully",
    });
  } catch (e) {
    console.error("error: ", e);
    return NextResponse.json(
      {
        success: false,
        message: "Could not update coupon",
        error: e,
      },
      { status: 500 },
    );
  }
}
