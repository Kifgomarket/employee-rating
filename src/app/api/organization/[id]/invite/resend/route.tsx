import privateRoute from "@/app/api/helpers/privateRoute";
import { NextRequest, NextResponse } from "next/server";
import { ResendInviteSchema } from "@/schemas/user.schema";
import handleError from "@/app/api/helpers/handleError";

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
      } catch (error) {
        return handleError(error, "Failed to resend invitation");
      }
    },
  );
}
