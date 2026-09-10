import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/features/auth/services/jwt";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login","forget-password","otp","password-setup"];

export async function proxy(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const accessToken = request.headers
    .get("cookie")
    ?.split("; ")
    .find((cookie) => cookie.startsWith("accessToken="))
    ?.split("=")[1];

  let isAuthenticated = false;

  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // Logged-in user trying to access /login
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard/products", request.url));
  }

  // Public auth page
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Protected page + valid access token
  if (isProtectedRoute && isAuthenticated) {
    return NextResponse.next();
  }

  // No/invalid access token → try refresh
  const refreshToken = request.headers
    .get("cookie")
    ?.split("; ")
    .find((cookie) => cookie.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const refreshResponse = await fetch(
    `${url.origin}/api/auth/refresh`,
    {
      method: "POST",
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  if (!refreshResponse.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const result = await refreshResponse.json();

  const response = NextResponse.next();

  response.cookies.set("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  return response;
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/forget-password",
    "/otp",
    "/password-setup",
  ],
};