import { NextResponse } from "next/server";

import { AppError } from "@/lib/AppError";

import { deleteProduct } from "@/features/products/services/Delete";
import { updateProduct } from "@/features/products/services/Update";

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

    const payload = await request.json();

    const product = await updateProduct(id, payload);

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