import prisma from "@/app/api/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const data = await prisma.category.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
