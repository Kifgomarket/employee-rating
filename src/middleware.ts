import cookieKeys from "@/configs/cookieKeys";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserWithOrgMembers } from "./app/api/auth/types";
import { UserRole } from "@prisma/client";

export async function middleware(request: NextRequest, _: NextResponse) {
  const session = request.cookies.get(cookieKeys.USER_TOKEN);
  const sessionUser = request.cookies.get(cookieKeys.USER);
  const user = JSON.parse(
    sessionUser?.value || "null",
  ) as UserWithOrgMembers | null;

  const onlyPublicRoutes = ["/login", "/register"];

  const isOnlyPublic = onlyPublicRoutes.includes(request.nextUrl.pathname);

  if (!session && !isOnlyPublic) {
    const url = new URL("/login", request.url);

    // Preserve all existing query parameters
    for (const [key, value] of request.nextUrl.searchParams.entries()) {
      url.searchParams.append(key, value);
    }

    // Add redirect_to parameter if it's not already present
    if (!url.searchParams.has("redirect_to")) {
      url.searchParams.set("redirect_to", request.nextUrl.pathname);
    }

    return NextResponse.redirect(url);
  }

  if (session && isOnlyPublic) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  if (session && !isOnlyPublic) {
    if (request.nextUrl.pathname.includes("owner-dashboard")) {
      if (
        !user?.OrganizationMembers.some((org) => org.role === UserRole.OWNER)
      ) {
        return NextResponse.redirect(new URL(`/`, request.url));
      }
    }

    if (request.nextUrl.pathname.includes("employee-dashboard")) {
      if (
        !user?.OrganizationMembers.some((org) => org.role === UserRole.EMPLOYEE)
      ) {
        return NextResponse.redirect(new URL(`/`, request.url));
      }
    }

    if (request.nextUrl.pathname.includes("supervisor-dashboard")) {
      if (
        !user?.OrganizationMembers.some(
          (org) => org.role === UserRole.SUPERVISOR,
        )
      ) {
        return NextResponse.redirect(new URL(`/`, request.url));
      }
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/login/:paths*",
    "/register/:paths*",
    "/protected/:paths*",
    "/owner-dashboard/:paths*",
    "/employee-dashboard/:paths*",
    "/supervisor-dashboard/:paths*",
  ],
};
