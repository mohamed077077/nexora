import { AppError } from "@/lib/AppError";
import type { ProductErrorResponse, ProductsSuccessResponse } from "../types";

export async function getProducts(): Promise<ProductsSuccessResponse["data"]> {
  try {
    const response = await fetch("/api/product");
    const result = (await response.json()) as ProductsSuccessResponse | ProductErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError((result as ProductErrorResponse).message, response.status);
    }

    return (result as ProductsSuccessResponse).data;
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
