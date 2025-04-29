import { NextRequest, NextResponse } from "next/server";

/**
 * @route POST /api/auth/login
 * @desc Handle user login request and return a success response
 * @access Public
 */
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        data: {},
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
  }
}
