import { AppError } from "@/lib/AppError";
import type {
  OrderErrorResponse,
  OrderSuccessResponse,
  OrderStatus,
} from "../types";
import type { UpdateOrderStatusValues } from "../validations/orderSchema";

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<OrderSuccessResponse["data"]> {
  try {
    const response = await fetch(`/api/order/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

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

export async function updateOrder(
  id: string,
  data: UpdateOrderStatusValues
): Promise<OrderSuccessResponse["data"]> {
  return updateOrderStatus(id, data.status);
}
