import privateRoute from "@/app/api/helpers/privateRoute";
import { AssignEmployeesSchema } from "@/schemas/user.schema";
import { NextRequest } from "next/server";
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
      permissions: ["USER:*:*", "USER:ASSIGN:ASSIGNED"],
    },
    async () => {
      try {
        const { supervisorId, employeeIds } = AssignEmployeesSchema.parse(body);
      } catch {}
    },
  );
}
