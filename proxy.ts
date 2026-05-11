import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = ["/dashboard", "/settings", "/admin", "/collections", "/favorites", "/registry/new"];

const authCookieNames = [
  "better-auth.session-token",
  "better-auth.session",
  "__Secure-better-auth.session-token",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const hasSessionCookie = authCookieNames.some((name) => request.cookies.has(name));

  if (hasSessionCookie) {
    return NextResponse.next();
  }

  const redirectUrl = new URL("/sign-in", request.url);
  redirectUrl.searchParams.set("from", pathname);

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/collections/:path*",
    "/favorites/:path*",
    "/registry/new/:path*",
  ],
};
