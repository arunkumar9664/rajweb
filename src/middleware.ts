import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { checkRateLimit } from "@/security/rate-limit";
import { apiError } from "@/core/api/api-response";
import { generateRequestId } from "@/core/api/request-context";
import { ErrorCodes } from "@/core/errors/error-codes";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders: Record<string, string> = {
  "Content-Security-Policy": isDev
    ? "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';"
    : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

function applySecurityHeaders(response: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  response.headers.set("X-Request-Id", generateRequestId());
}

export async function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (request.nextUrl.pathname.startsWith("/api/")) {
    const allowed = await checkRateLimit(`global:${ip}`, 120, 60000);
    if (!allowed) {
      const requestId = generateRequestId();
      return NextResponse.json(
        apiError(ErrorCodes.RATE_LIMITED, "Too many requests", requestId),
        { status: 429 }
      );
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    const loginAllowed = await checkRateLimit(`login-page:${ip}`, 20, 60000);
    if (!loginAllowed) {
      return new NextResponse("Too many login attempts. Please try again later.", {
        status: 429,
      });
    }
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    const adminRoles = [
      "super-admin",
      "federation-admin",
      "district-admin",
      "tournament-manager",
      "content-manager",
    ];

    if (!adminRoles.includes(token.role as string)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const response = NextResponse.next();
  applySecurityHeaders(response);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|uploads|images).*)"],
};
