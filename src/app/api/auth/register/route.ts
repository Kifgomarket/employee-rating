import { RegisterUserSchema } from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = RegisterUserSchema.parse(body);
    const isUserExist = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    if (isUserExist) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_ALREADY_EXISTS",
            message: "User is already exist",
          },
        },
        { status: 409 },
      );
    }
    const isOrganizationExist = await prisma.organization.findUnique({
      where: { name: validatedData.organizationName },
    });
    if (isOrganizationExist) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "ORGANIZATION_NAME_ALREADY_EXISTS",
            message: "Organization name is already exist",
          },
        },
        { status: 409 },
      );
    }
  } catch (error) {}
}
