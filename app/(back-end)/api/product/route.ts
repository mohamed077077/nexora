import { NextResponse } from "next/server";

import { AppError } from "@/lib/AppError";

import { createProduct } from "@/features/products/services/Create";
import { getProducts } from "@/features/products/services/Read";
import { productSchema } from "@/features/products/validations/productSchema";

import type {
  ProductErrorResponse,
  ProductsSuccessResponse,
  ProductSuccessResponse,
} from "@/features/products/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = productSchema.safeParse(body);
    if (!payload.success) {
      throw new AppError(
        payload.error.issues[0]?.message ?? "Invalid product data",
        400
      );
    }

    const product = await createProduct({
      ...payload.data,
      variants: body.variants ?? [],
    });

    return NextResponse.json<ProductSuccessResponse>(
      {
        success: true,
        data: {
          message: "Product created successfully",
          product,
        },
      },
      { status: 201 }
    );
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

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json<ProductsSuccessResponse>({
      success: true,
      data: {
        message: "Products fetched successfully",
        products,
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
        message: "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}
