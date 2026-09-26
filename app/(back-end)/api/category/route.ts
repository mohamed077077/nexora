import { NextResponse } from "next/server";
import { AppError } from "@/lib/AppError";
import { createCategory } from "@/features/categories/services/Create";
import { getCategories } from "@/features/categories/services/Read";
import type { CategorySuccessResponse, CategoriesSuccessResponse, CategoryErrorResponse } from "@/features/categories/types";

export async function POST(request: Request) {
  try {
    const { title, iconUrl } = await request.json();

    if (!title || !iconUrl) {
      throw new AppError("Title and Icon URL are required", 400);
    }

    const category = await createCategory(title, iconUrl);

    return NextResponse.json<CategorySuccessResponse>({
      success: true,
      data: { 
        message: "Category created successfully", 
        category 
      },
    }, { status: 201 });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<CategoryErrorResponse>(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json<CategoryErrorResponse>(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await getCategories();

    return NextResponse.json<CategoriesSuccessResponse>({
      success: true,
      data: {
        message: "Categories fetched successfully",
        categories
      },
    }, { status: 200 });
  } catch {
    return NextResponse.json<CategoryErrorResponse>(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
