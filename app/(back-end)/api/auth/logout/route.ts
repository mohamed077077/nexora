import { NextResponse } from "next/server";
import { AppError } from "@/lib/AppError";
import { logoutUser } from "@/features/auth/services/logout";
import type { LogoutSuccessResponse, AuthErrorResponse } from "@/features/auth/types";

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie");

    const refreshToken = cookieHeader
      ?.split("; ")
      .find((cookie) => cookie.startsWith("refreshToken="))
      ?.split("=")[1];

    await logoutUser(refreshToken!);

    const response = NextResponse.json<LogoutSuccessResponse>({
      success: true,
      data: { message: "Logout successful" },
    });

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<AuthErrorResponse>(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json<AuthErrorResponse>(
      { success: false, message: "Logout failed" },
      { status: 500 }
    );
  }
}