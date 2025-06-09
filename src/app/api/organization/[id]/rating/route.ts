import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import privateRoute from "@/app/api/helpers/privateRoute";
import handleError from "@/app/api/helpers/handleError";
import { createRatingSchema } from "@/schemas/rating.schema";

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
      permissions: ["RATING:*:*", "RATING:CREATE:*", "RATING:CREATE:ASSIGNED"],
    },
    async (user) => {
      try {
        //validation
        const parsed = createRatingSchema.parse(body);

        const { employeeId, periodStart, periodEnd, feedback, criteriaScores } =
          parsed;

        // Find supervisor's membership in this organization
        const supervisorMembership = await prisma.organizationMember.findFirst({
          where: {
            userId: employeeId,
            supervisorId: user.id,
          },
          include: {
            Organization: true,
          },
        });

        if (!supervisorMembership) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "NOT_SUPERVISOR",
                message: "You are not the supervisor of this employee",
              },
            },
            { status: 403 },
          );
        }
      } catch (error) {
        return handleError(error, "Failed to create rating");
      }
    },
  );
}
