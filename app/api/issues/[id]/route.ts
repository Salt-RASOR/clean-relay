import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
