import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "cube_session";

function getSecret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) {
    throw new Error("AUTH_SECRET must be set and at least 16 characters");
  }
  return new TextEncoder().encode(s);
}

export type SessionPayload = {
  sub: string;
  username: string;
};

export async function signSessionToken(userId: string, username: string) {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const sub = typeof payload.sub === "string" ? payload.sub : null;
    const username =
      typeof payload.username === "string" ? payload.username : null;
    if (!sub || !username) return null;
    return { sub, username };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
