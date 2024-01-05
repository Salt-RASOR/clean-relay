import prisma from "@/app/api/prismaClient";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/getAddress:
 *  get:
 *  description: Returns the current adress based on location
 *  responses:
 *  200:
 * description: Hello World
 *
 */
export const GET = async (req: Request) => {
  try {
    const data = await prisma.category.findMany();
    prisma.$disconnect();

    return NextResponse.json(data);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
