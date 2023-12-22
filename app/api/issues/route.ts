import { NextResponse } from "next/server";

import prisma from "@/app/api/prismaClient";
import supabase from "@/app/api/supabaseClient";

import { validateIssuePost, validateImageBuffer } from "../validation";
import {
  transformIssueGetData,
  transformIssuePostData,
  encodeCoordinates,
} from "../../utils/coordinates";
import decodeForm from "@/app/utils/decodeForm";
import { randomUUID } from "crypto";
import getAddress from "../getAddress";
import sharp from "sharp";

export const GET = async (req: Request) => {
  try {
    const data = await prisma.issue.findMany({
      include: { category: true, status: true },
    });
    prisma.$disconnect();

    const decodedData = data.map(transformIssueGetData);

    return NextResponse.json(decodedData);
  } catch (error) {
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();

    const body = decodeForm(data);
    const validate = validateIssuePost(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.issues, { status: 400 });
    }

    const file: File | null = data.get("imageFile") as unknown as File;

    const fileBuffer = await file.arrayBuffer();
    const validateImage = await validateImageBuffer(fileBuffer);

    if (!validateImage.success) {
      return NextResponse.json(
        { error: "Wrong/missing file type" },
        { status: 400 }
      );
    }

    const compressedBuffer = await sharp(fileBuffer)
      .png({ quality: 64 })
      .resize(400, 300, {
        fit: "inside",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    let address = await getAddress(body.lat, body.lng);

    // retry reverse geocode 5 times cause Google API is buggy
    if (address.error) {
      for (let i = 0; i < 5; i++) {
        address = await getAddress(body.lat, body.lng);

        if (!address.error) {
          break;
        }
      }

      if (address.error) {
        console.log("Address Error: ", address.error);
        throw address.error.toString();
      }
    }

    const fileName = `${randomUUID()}.png`;

    const upload = await supabase.upload(fileName, compressedBuffer, {
      contentType: "image/png",
    });

    if (upload.error) {
      console.log("Upload Error: ", upload.error);
      throw new Error(upload.error.message);
    }

    const filePath = upload.data.path;

    const imgUrl =
      (process.env.SUPABASE_IMG_URL as string) + (upload.data?.path as string);

    encodeCoordinates(body);

    const statusId = 1;

    const result = await prisma.issue.create({
      data: { ...body, imgUrl, statusId, address: address.result, filePath },
      include: { status: true, category: true },
    });

    prisma.$disconnect();

    const transformedResult = transformIssuePostData(result);
    return NextResponse.json(transformedResult, { status: 201 });
  } catch (error) {
    console.log(error);
    prisma.$disconnect();

    return NextResponse.json(error, { status: 500 });
  }
};
