import type { CategoryFormValues } from "../validations/categorySchema";
import type { CategorySuccessResponse, CategoryErrorResponse } from "../types";
import { AppError } from "@/lib/AppError";

export async function addCategory(data: CategoryFormValues): Promise<CategorySuccessResponse["data"]> {
  try {
    const response = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json() as CategorySuccessResponse | CategoryErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError((result as CategoryErrorResponse).message, response.status);
    }

    return (result as CategorySuccessResponse).data;
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
