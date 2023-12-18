import { NextResponse } from "next/server";
import prisma from "@/app/client";

import { validateIssuePost } from "../validation";
import { decodeCoordinates, encodeCoordinates } from "../../utils/coordinates";

export const GET = async (req: Request) => {
  try {
    const data = await prisma.issue.findMany();
    data.forEach(decodeCoordinates);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const validate = validateIssuePost(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    encodeCoordinates(body);
    body.imgUrl = "image url here";
    body.statusId = 1;

    const data = await prisma.issue.create({ data: body });

    decodeCoordinates(body);
    body.id = data.id;
    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
