import { NextResponse } from "next/server";

import { AppError } from "@/lib/AppError";

import { createProduct } from "@/features/products/services/Create";
import { getProducts } from "@/features/products/services/Read";

import type {
  ProductErrorResponse,
  ProductsSuccessResponse,
  ProductSuccessResponse,
} from "@/features/products/types";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const product = await createProduct(payload);

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