import { NextResponse } from "next/server";

import { AppError } from "@/lib/AppError";
import { loginUser } from "@/features/auth/services/login";
import type { LoginSuccessResponse, AuthErrorResponse } from "@/features/auth/types";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const { accessToken, refreshToken } = await loginUser(email, password);

    const response = NextResponse.json<LoginSuccessResponse>({
      success: true,
      data: { message: "Login successful", accessToken },
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60,
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    return response;
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<AuthErrorResponse>(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json<AuthErrorResponse>(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}