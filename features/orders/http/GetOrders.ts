import { AppError } from "@/lib/AppError";
import type { OrderErrorResponse, OrdersSuccessResponse } from "../types";

export async function getOrders(): Promise<OrdersSuccessResponse["data"]> {
  try {
    const response = await fetch("/api/order");
    const result = (await response.json()) as
      | OrdersSuccessResponse
      | OrderErrorResponse;

    if (!response.ok || !result.success) {
      throw new AppError(
        (result as OrderErrorResponse).message,
        response.status
      );
    }

    return (result as OrdersSuccessResponse).data;
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
