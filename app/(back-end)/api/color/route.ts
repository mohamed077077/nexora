import { NextResponse } from "next/server";
import { AppError } from "@/lib/AppError";
import { createColor } from "@/features/colors/services/Create";
import { getColors } from "@/features/colors/services/Read";
import { colorSchema } from "@/features/colors/validations/colorSchema";
import type { ColorErrorResponse, ColorsSuccessResponse, ColorSuccessResponse } from "@/features/colors/types";

export async function POST(request: Request) {
  try {
    const payload = colorSchema.safeParse(await request.json());
    if (!payload.success) {
      throw new AppError(payload.error.issues[0]?.message ?? "Invalid color data", 400);
    }

    const color = await createColor(payload.data.title, payload.data.iconUrl);
    return NextResponse.json<ColorSuccessResponse>(
      { success: true, data: { message: "Color created successfully", color } },
      { status: 201 }
    );
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

export async function GET() {
  try {
    const colors = await getColors();
    return NextResponse.json<ColorsSuccessResponse>({
      success: true,
      data: { message: "Colors fetched successfully", colors },
    });
  } catch {
    return NextResponse.json<ColorErrorResponse>(
      { success: false, message: "Failed to fetch colors" },
      { status: 500 }
    );
  }
}
