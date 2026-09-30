import { AppError } from "@/lib/AppError";
import type { ColorErrorResponse, ColorsSuccessResponse } from "../types";

export async function getColors(): Promise<ColorsSuccessResponse["data"]> {
  try {
    const response = await fetch("/api/color");
    const result = (await response.json()) as ColorsSuccessResponse | ColorErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError((result as ColorErrorResponse).message, response.status);
    }

    return (result as ColorsSuccessResponse).data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Please check your internet connection.");
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new Error("Something went wrong");
  }
}
