import type { LogoutSuccessResponse, AuthErrorResponse } from "../types";
import { AppError } from "@/lib/AppError";

export async function logoutUser(): Promise<LogoutSuccessResponse["data"]> {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json() as LogoutSuccessResponse | AuthErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError((result as AuthErrorResponse).message, response.status);
    }

    return (result as LogoutSuccessResponse).data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Please check your internet connection.");
    }
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new Error("Something went wrong");
  }
}