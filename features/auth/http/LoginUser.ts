import type { LoginForm } from "../validation/LoginSchema";
import type { LoginSuccessResponse, AuthErrorResponse } from "../types";
import { AppError } from "@/lib/AppError";

export async function loginUser(data: LoginForm): Promise<LoginSuccessResponse["data"]> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json() as LoginSuccessResponse | AuthErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError((result as AuthErrorResponse).message, response.status);
    }

    return (result as LoginSuccessResponse).data;
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
