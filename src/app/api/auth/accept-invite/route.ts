import { AcceptInviteUserSchema } from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  IJWTInvitePayload,
  INVITE_TOKEN_TYPE,
} from "../../organization/[id]/invite/generateInviteToken";
import { hash } from "argon2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, firstName, lastName, password } =
      AcceptInviteUserSchema.parse(body);
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as IJWTInvitePayload & JwtPayload;
    if (decodedToken.type !== INVITE_TOKEN_TYPE) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_TOKEN_TYPE",
            message: "invalid token type",
          },
        },
        { status: 401 },
      );
    }
    const hashedPassword = await hash(password);
  } catch (error) {}
}
