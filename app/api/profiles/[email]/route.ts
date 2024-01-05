import hashEmail from "@/app/utils/hashEmail";
import prisma from "../../prismaClient";
import { NextResponse } from "next/server";
import { validateProfilePatch } from "../../validation";
import checkProfileAuth from "@/app/utils/checkProfileAuth";
import supabaseImages, { supabase } from "../../supabaseClient";

export const GET = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const auth = await checkProfileAuth(params.email, req, supabase);
    if (auth) {
      return auth;
    }

    const hash = hashEmail(params.email);

    const data = await prisma.profile.findUnique({
      where: { hash },
    });

    prisma.$disconnect();

    if (!data) {
      return NextResponse.json(data, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const body = await req.json();

    const validate = validateProfilePatch(body);
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

    const data = await prisma.profile.update({
      where: { hash },
      data: body,
    });

    prisma.$disconnect();

    return NextResponse.json(data);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  try {
    const auth = await checkProfileAuth(params.email, req, supabase);
    if (auth) {
      return auth;
    }

    const hash = hashEmail(params.email);

    const found = await prisma.profile.findFirst({ where: { hash } });

    if (!found) {
      prisma.$disconnect();
      return NextResponse.json(found, { status: 404 });
    }

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const { data, error } = await supabase.auth.getUser(token);

    if (!data || error) {
      return NextResponse.json(error, { status: 404 });
    }

    const issues = await prisma.issue.findMany({
      where: { userId: found.userId },
    });
    if (issues.length > 0) {
      issues.forEach((issue) => {
        const filePath = issue.filePath;
        supabaseImages.remove([filePath]);
      });
    }

    const supabaseId = data.user.id;

    const deleteProfile = await supabase.auth.admin.deleteUser(supabaseId);

    if (deleteProfile.error || !deleteProfile.data) {
      return NextResponse.json(deleteProfile.error, { status: 500 });
    }

    const result = await prisma.user.delete({
      where: { id: found.userId },
    });
    prisma.$disconnect();

    return NextResponse.json(result);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
