import { NextResponse } from "next/server";

import prisma from "@/app/utils/prismaClient";
import supabaseImages, { supabase } from "@/app/utils/supabaseClient";

import { validateIssuePost, validateImageBuffer } from "../../utils/validation";
import {
  transformIssueGetData,
  transformIssuePostData,
  encodeCoordinates,
} from "../../utils/transformResponses";
import decodeForm from "@/app/utils/decodeForm";
import { randomUUID } from "crypto";
import getAddress from "../../utils/getAddress";
import sharp from "sharp";
import generateUser from "@/app/utils/generateUser";

/**
 * @swagger
 * /api/issues:
 *   get:
 *     summary: Gets a list of all active issues/reports
 *     description: Gets a list of all active issues/reports
 *     responses:
 *       200:
 *         description: Successful fetch
 *       500:
 *         description: Server error
 *   post:
 *     summary: Creates a new issue based on the data
 *     description: Creates a new issue based on the data. Will create a new user id if not provided, or will use the given user id if possible (based on authentication.)
 *     parameters:
 *       - in: formData
 *         name: userId
 *         type: string
 *         description: User Id (UUID)
 *       - in: formData
 *         name: userText
 *         type: string
 *         description: User text description
 *         required: true
 *       - in: formData
 *         name: categoryId
 *         type: integer
 *         description: Issue category int
 *         required: true
 *       - in: formData
 *         name: lat
 *         type: float
 *         description: Issue latitude float
 *         required: true
 *       - in: formData
 *         name: lng
 *         type: float
 *         description: Issue longitude float
 *         required: true
 *       - in: formData
 *         name: imageFile
 *         type: File
 *         description: Issue attached image File object
 *         required: true
 *       - in: header
 *         name: userId
 *         type: string
 *         description: User Id (UUID) for authentication
 *       - in: header
 *         name: authorization
 *         type: string
 *         description: Supabase JWT for authentication
 *     responses:
 *       201:
 *         description: Successful post
 *       400:
 *         description: Invalid formData
 *       403:
 *         description: Invalid credentials for userId formData
 *       500:
 *         description: Server error
 */

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

    const userId = await generateUser(body.userId, false, req, supabase);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized post" },
        { status: 403 }
      );
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

    const upload = await supabaseImages.upload(fileName, compressedBuffer, {
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

    body.userId = userId;

    const result = await prisma.issue.create({
      data: {
        ...body,
        imgUrl,
        statusId,
        address: address.result,
        filePath,
        userId: body.userId,
      },
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
