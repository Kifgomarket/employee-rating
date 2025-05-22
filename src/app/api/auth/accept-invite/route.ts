import { AcceptInviteUserSchema } from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  IJWTInvitePayload,
  INVITE_TOKEN_TYPE,
} from "../../organization/[id]/invite/generateInviteToken";
import prisma from "@/lib/prisma";
import { hash } from "argon2";
import { UserStatus } from "@prisma/client";
import generateToken, { IJWTPayload } from "../../helpers/generateToken";

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
     const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: {
          id: decodedToken.id,
        },
        data: {
          firstName,
          lastName,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          OrganizationMembers: {
            where: {
              organizationId: decodedToken.organizationId,
            },
            select: {
              organizationId: true,
              role: true,
              permissions: true,
              status: true,
            },
          },
        },
      });
      await tx.organizationMember.update({
        where: {
          userId_organizationId: {
            userId: decodedToken.id,
            organizationId: decodedToken.organizationId,
          },
        },
        data: {
          status: UserStatus.ACTIVE,
        },
      });
      return user;
    });
    
  } catch (error) {}
}
