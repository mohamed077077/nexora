import type {
  ColorsSuccessResponse,
  ColorErrorResponse,
} from "../types";

import { AppError } from "@/lib/AppError";

export async function getColorsWithProducts(): Promise<
  ColorsSuccessResponse["data"]
> {
  try {
    const response = await fetch("/api/color/with-products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result =
      (await response.json()) as
        | ColorsSuccessResponse
        | ColorErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError(
        (result as ColorErrorResponse).message,
        response.status
      );
    }

    return (result as ColorsSuccessResponse).data;
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
