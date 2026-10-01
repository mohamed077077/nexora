import { NextResponse } from "next/server";
import { getCategoriesWithProducts } from "@/features/categories/services/Read";
import type { CategoriesSuccessResponse, CategoryErrorResponse } from "@/features/categories/types";


export async function GET() {
  try {
    const categories = await getCategoriesWithProducts();

    return NextResponse.json<CategoriesSuccessResponse>(
      {
        success: true,
        data: {
          message: "Categories with products fetched successfully",
          categories,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<CategoryErrorResponse>(
      {
        success: false,
        message: "Failed to fetch categories with products",
      },
      { status: 500 }
    );
  }
}