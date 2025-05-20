import privateRoute from "@/app/api/helpers/privateRoute";
import { NextRequest, NextResponse } from "next/server";
import { ResendInviteSchema } from "@/schemas/user.schema";
import handleError from "@/app/api/helpers/handleError";
import { UserStatus } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: organizationId } = await params;
  const body = await request.json();

  return privateRoute(
    request,
    {
      organizationId,
      permissions: ["ORGANIZATION::", "ORGANIZATION:INVITE:*"],
    },
    async (inviter) => {
      try {
        const { id: invitedUserId } = ResendInviteSchema.parse(body);

        const [organization, invitedUser] = await Promise.all([
          prisma.organization.findUnique({
            where: {
              id: organizationId,
            },
            select: {
              id: true,
              name: true,
              ownerId: true,
            },
          }),
          prisma.user.findUnique({
            where: {
              id: invitedUserId,
            },
            include: {
              OrganizationMembers: {
                where: {
                  organizationId,
                  status: UserStatus.INVITED,
                },
              },
            },
          }),
        ]);

        if (!invitedUser || invitedUser.OrganizationMembers.length === 0) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "INVITATION_NOT_FOUND",
                message: "invitation not found",
              },
            },
            { status: 404 },
          );
        }

        if (!organization || organization.ownerId !== inviter.id) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "ORGANIZATION_NOT_FOUND",
                message: "Organization is not found or inactive.",
              },
            },
            { status: 404 },
          );
        }
      } catch (error) {
        return handleError(error, "Failed to resend invitation");
      }
    },
  );
}
