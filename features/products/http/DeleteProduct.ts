import { AppError } from "@/lib/AppError";
import type { ProductErrorResponse, ProductSuccessResponse } from "../types";

export async function deleteProduct(
  id: string
): Promise<ProductSuccessResponse["data"]> {
  try {
    const response = await fetch(`/api/product/${id}`, { method: "DELETE" });
    const result = (await response.json()) as ProductSuccessResponse | ProductErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError((result as ProductErrorResponse).message, response.status);
    }

    return (result as ProductSuccessResponse).data;
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
