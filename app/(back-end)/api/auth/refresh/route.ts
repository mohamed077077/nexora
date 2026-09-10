import { NextResponse } from "next/server";

import { AppError } from "@/lib/AppError";
import { refreshAccessToken } from "@/features/auth/services/refresh";
import type { RefreshSuccessResponse, AuthErrorResponse } from "@/features/auth/types";

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie");

    const refreshToken = cookieHeader
      ?.split("; ")
      .find((cookie) => cookie.startsWith("refreshToken="))
      ?.split("=")[1];

    if (!refreshToken) {
      throw new AppError("Invalid refresh token", 401);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await refreshAccessToken(refreshToken);

    const response = NextResponse.json<RefreshSuccessResponse>({
      success: true,
      data: { accessToken },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<AuthErrorResponse>(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }

    console.error(error);

    return NextResponse.json<AuthErrorResponse>(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}