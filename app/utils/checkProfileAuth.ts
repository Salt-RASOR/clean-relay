import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const checkProfileAuth = async (
  email: string,
  req: Request,
  supabase: SupabaseClient
) => {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { message: "Missing authentication" },
      { status: 401 }
    );
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return NextResponse.json(
        { message: "Unauthorized access error" },
        { status: 403 }
      );
    }

    if (data.user.email !== email) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }

    return null;
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export default checkProfileAuth;
