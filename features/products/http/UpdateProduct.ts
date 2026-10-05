import { AppError } from "@/lib/AppError";
import type { ProductErrorResponse, ProductSuccessResponse } from "../types";
import type { ProductFormValues } from "../validations/productSchema";
import { useVariantStore } from "../store/useProductStore";


export async function updateProduct(
  id: string,
  data: ProductFormValues
): Promise<ProductSuccessResponse["data"]> {
  try {
    const { draft } = useVariantStore.getState();
    const payload = {
      ...data,
      variants: draft ?? [],
    };
    const response = await fetch(`/api/product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
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
