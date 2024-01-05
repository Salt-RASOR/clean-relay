import prisma from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello World!
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
