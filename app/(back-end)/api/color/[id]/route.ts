import { NextResponse } from "next/server";
import { AppError } from "@/lib/AppError";
import { deleteColor } from "@/features/colors/services/Delete";
import { updateColor } from "@/features/colors/services/Update";
import { colorSchema } from "@/features/colors/validations/colorSchema";
import type { ColorErrorResponse, ColorSuccessResponse } from "@/features/colors/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const payload = colorSchema.safeParse(await request.json());
    if (!payload.success) {
      throw new AppError(payload.error.issues[0]?.message ?? "Invalid color data", 400);
    }

    const color = await updateColor(id, payload.data.title, payload.data.iconUrl);
    return NextResponse.json<ColorSuccessResponse>({
      success: true,
      data: { message: "Color updated successfully", color },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<ColorErrorResponse>(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json<ColorErrorResponse>(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const color = await deleteColor(id);
    return NextResponse.json<ColorSuccessResponse>({
      success: true,
      data: { message: "Color deleted successfully", color },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<ColorErrorResponse>(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json<ColorErrorResponse>(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
