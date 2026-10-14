import { AppError } from "@/lib/AppError";
import type { OrderErrorResponse, OrderSuccessResponse } from "../types";

export async function deleteOrder(
  id: string
): Promise<OrderSuccessResponse["data"]> {
  try {
    const response = await fetch(`/api/order/${id}`, { method: "DELETE" });
    const result = (await response.json()) as
      | OrderSuccessResponse
      | OrderErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError(
        (result as OrderErrorResponse).message,
        response.status
      );
    }

    return (result as OrderSuccessResponse).data;
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
