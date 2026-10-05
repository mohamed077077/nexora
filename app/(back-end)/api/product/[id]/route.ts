import { NextResponse } from "next/server";

import { AppError } from "@/lib/AppError";

import { deleteProduct } from "@/features/products/services/Delete";
import { updateProduct } from "@/features/products/services/Update";
import { productSchema } from "@/features/products/validations/productSchema";

import type {
  ProductErrorResponse,
  ProductSuccessResponse,
} from "@/features/products/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const payload = productSchema.safeParse(body);
    if (!payload.success) {
      throw new AppError(
        payload.error.issues[0]?.message ?? "Invalid product data",
        400
      );
    }

    const product = await updateProduct(id, {
      ...payload.data,
      variants: body.variants ?? [],
    });

    return NextResponse.json<ProductSuccessResponse>({
      success: true,
      data: {
        message: "Product updated successfully",
        product,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<ProductErrorResponse>(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.statusCode,
        }
      );
    }

    return NextResponse.json<ProductErrorResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const product = await deleteProduct(id);

    return NextResponse.json<ProductSuccessResponse>({
      success: true,
      data: {
        message: "Product deleted successfully",
        product,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<ProductErrorResponse>(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.statusCode,
        }
      );
    }

    return NextResponse.json<ProductErrorResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
