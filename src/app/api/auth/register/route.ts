import { RegisterUserSchema } from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the path based on your project structure
import argon2 from "argon2";

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

    const { firstName, lastName, email, password } = validatedData;

    // Hashed the password securely
    const hashedPassword = await argon2.hash(password);

    //created a user using the validated data
    const result = await prisma.$transaction(async (tx) => {
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });
    });
    return NextResponse.json(
      { success: true, message: "User created successfully." },
      { status: 201 },
    );
  } catch (error) {}
}
