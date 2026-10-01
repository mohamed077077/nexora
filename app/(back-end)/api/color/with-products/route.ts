import { NextResponse } from "next/server";
import { getColorsWithProducts } from "@/features/colors/services/Read";
import type { ColorsSuccessResponse, ColorErrorResponse } from "@/features/colors/types";


export async function GET() {
  try {
    const colors = await getColorsWithProducts();

    return NextResponse.json<ColorsSuccessResponse>(
      {
        success: true,
        data: {
          message: "Colors with products fetched successfully",
          colors,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ColorErrorResponse>(
      {
        success: false,
        message: "Failed to fetch colors with products",
      },
      { status: 500 }
    );
  }
}
