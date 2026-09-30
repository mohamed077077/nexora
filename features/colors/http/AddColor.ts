import { AppError } from "@/lib/AppError";
import type { ColorFormValues } from "../validations/colorSchema";
import type { ColorErrorResponse, ColorSuccessResponse } from "../types";

export async function addColor(data: ColorFormValues): Promise<ColorSuccessResponse["data"]> {
  try {
    const response = await fetch("/api/color", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = (await response.json()) as ColorSuccessResponse | ColorErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError((result as ColorErrorResponse).message, response.status);
    }

    return (result as ColorSuccessResponse).data;
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
