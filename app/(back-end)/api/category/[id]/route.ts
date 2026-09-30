import { NextResponse } from "next/server";
import { AppError } from "@/lib/AppError";
import { updateCategory } from "@/features/categories/services/Update";
import { deleteCategory } from "@/features/categories/services/Delete";
import type { CategorySuccessResponse, CategoryErrorResponse } from "@/features/categories/types";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, iconUrl } = await request.json();

    if (!title || !iconUrl) {
      throw new AppError("Title and Icon URL are required", 400);
    }

    const category = await updateCategory(id, title, iconUrl);

    return NextResponse.json<CategorySuccessResponse>({
      success: true,
      data: {
        message: "Category updated successfully",
        category,
      },
    }, { status: 200 });
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

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await deleteCategory(id);

    return NextResponse.json<CategorySuccessResponse>({
      success: true,
      data: {
        message: "Category deleted successfully",
        category,
      },
    }, { status: 200 });
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
