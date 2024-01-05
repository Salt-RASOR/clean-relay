import prisma from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Gets a list of all categories
 *     description: Gets a list of all categories
 *     responses:
 *       200:
 *         description: Successful fetch
 *       500:
 *         description: Server error
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
