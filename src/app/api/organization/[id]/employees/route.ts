import handleError from "@/app/api/helpers/handleError";
import privateRoute from "@/app/api/helpers/privateRoute";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: organizationId } = await params;

  return privateRoute(
    request,
    {
      organizationId,
      permissions: ["USER:*:*", "USER:READ:*", "USER:READ:ASSIGNED"],
    },
    async () => {
      try {
        const searchParams = request.nextUrl.searchParams;
        const search = (searchParams.get("search") || "").trim();
        const roleParam = (searchParams.get("role") || "").trim().toUpperCase();
        const pageParam = parseInt(searchParams.get("page") || "1", 10);
        const sizeParam = parseInt(searchParams.get("size") || "10", 10);

        const page =
          Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
        const sizeUnclamped =
          Number.isFinite(sizeParam) && sizeParam > 0 ? sizeParam : 10;
        const size = Math.min(sizeUnclamped, 100);
        const skip = (page - 1) * size;

        const allowedRoles = ["EMPLOYEE", "SUPERVISOR"] as const;
        const rolesFilter = allowedRoles.includes(roleParam as any)
          ? [roleParam]
          : (allowedRoles as unknown as string[]);

        const whereClause: any = {
          OrganizationMembers: {
            some: {
              organizationId,
              role: { in: rolesFilter },
            },
          },
          ...(search
            ? {
                OR: [
                  { firstName: { contains: search, mode: "insensitive" } },
                  { lastName: { contains: search, mode: "insensitive" } },
                  { email: { contains: search, mode: "insensitive" } },
                ],
              }
            : {}),
        };

        const [total, rawItems] = await Promise.all([
          prisma.user.count({ where: whereClause }),
          prisma.user.findMany({
            where: whereClause,
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              createdAt: true,
              updatedAt: true,
              OrganizationMembers: {
                where: { organizationId },
                select: { role: true },
              },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: size,
          }),
        ]);

        const items = rawItems.map((u) => {
          const { OrganizationMembers, ...rest } = u as any;
          const role = OrganizationMembers?.[0]?.role ?? null;
          return { ...rest, role };
        });

        const pages = Math.max(1, Math.ceil(total / size));

        return NextResponse.json(
          {
            success: true,
            data: {
              items,
              total,
              page,
              size,
              pages,
            },
          },
          { status: 200 },
        );
      } catch (error) {
        return handleError(error, "Failed to fetch all organization employees");
      }
    },
  );
}
