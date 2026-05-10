import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { COOKIE_NAME, signSessionToken } from "@/lib/jwt";

const USER_RE = /^[a-zA-Z0-9_-]{3,24}$/;

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const username = (body.username ?? "").trim();
  const password = body.password ?? "";
  if (!USER_RE.test(username)) {
    return NextResponse.json(
      { error: "Username must be 3–24 chars: letters, numbers, _ -" },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 },
    );
  }
  const passwordHash = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: { username, passwordHash },
    });
    const token = await signSessionToken(user.id, user.username);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch {
    return NextResponse.json(
      { error: "Username already taken" },
      { status: 409 },
    );
  }
}
