import { LoginUserSchema } from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route POST /api/auth/login
 * @desc Handle user login request and return a success response
 * @access Public
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = LoginUserSchema.parse(body);
    return NextResponse.json(
      {
        success: true,
        data: {email, password},
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
  }
}
