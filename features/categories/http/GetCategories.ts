import type { CategoriesSuccessResponse, CategoryErrorResponse } from "../types";
import { AppError } from "@/lib/AppError";

export async function getCategories(): Promise<CategoriesSuccessResponse["data"]> {
  try {
    const response = await fetch("/api/category", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json() as CategoriesSuccessResponse | CategoryErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError((result as CategoryErrorResponse).message, response.status);
    }

    return (result as CategoriesSuccessResponse).data;
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
