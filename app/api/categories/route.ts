import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
