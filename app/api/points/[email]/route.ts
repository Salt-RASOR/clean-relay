import hashEmail from "@/app/utils/hashEmail";
import prisma from "../../prismaClient";
import { NextResponse } from "next/server";
import {
  validatePointsPost,
  validatePointsPut,
  validateProfilePatch,
} from "../../validation";
import checkProfileAuth from "@/app/utils/checkProfileAuth";
import { supabase } from "../../supabaseClient";

export const POST = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const body = await req.json();

    const validate = validatePointsPost(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    const auth = await checkProfileAuth(params.email, req, supabase);
    if (auth) {
      return auth;
    }

    const hash = hashEmail(params.email);

    const found = await prisma.profile.findUnique({ where: { hash } });
    if (!found) {
      prisma.$disconnect();

      return NextResponse.json(found, { status: 404 });
    }

    const points = body.points + found.points;

    const data = await prisma.profile.update({
      where: { hash },
      data: { points },
    });

    prisma.$disconnect();

    return NextResponse.json(data);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const body = await req.json();

    const validate = validatePointsPut(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    const auth = await checkProfileAuth(params.email, req, supabase);
    if (auth) {
      return auth;
    }

    const hash = hashEmail(params.email);

    const found = await prisma.profile.findUnique({ where: { hash } });
    if (!found) {
      prisma.$disconnect();

      return NextResponse.json(found, { status: 404 });
    }

    const points = body.points;

    const data = await prisma.profile.update({
      where: { hash },
      data: { points },
    });

    prisma.$disconnect();

    return NextResponse.json(data);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
