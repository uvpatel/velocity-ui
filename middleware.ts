import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = ["/dashboard", "/settings", "/admin", "/collections", "/registry/new"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("better-auth.session-token") ?? request.cookies.get("better-auth.session") ?? request.cookies.get("session");

  if (sessionCookie) {
    return NextResponse.next();
  }

  const redirectUrl = new URL("/sign-in", request.url);
  redirectUrl.searchParams.set("from", pathname);

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/admin/:path*", "/collections/:path*", "/registry/new/:path*"],
};