import { NextResponse } from "next/server";
import prisma from "../../client";

export const GET = async (req: Request) => {
  try {
    const data = await prisma.issue.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async () => {};
