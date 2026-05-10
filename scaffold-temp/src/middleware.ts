import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "@/lib/jwt";

function getSecretKey() {
  const s = process.env.AUTH_SECRET ?? "cube-prototype-change-in-production-min-32-chars!!";
  return new TextEncoder().encode(s);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  try {
    await jwtVerify(token, getSecretKey());
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.delete(COOKIE_NAME);
    return res;
  }
}

export const config = {
  matcher: ["/boot/:path*", "/home/:path*", "/act/:path*"],
};
