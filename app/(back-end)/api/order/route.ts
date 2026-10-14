import { NextResponse } from "next/server";

import { AppError } from "@/lib/AppError";

import { createOrder } from "@/features/orders/services/Create";
import { getOrders } from "@/features/orders/services/Read";
import { orderSchema } from "@/features/orders/validations/orderSchema";

import type {
  OrderErrorResponse,
  OrdersSuccessResponse,
  OrderSuccessResponse,
} from "@/features/orders/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = orderSchema.safeParse(body);
    if (!payload.success) {
      throw new AppError(
        payload.error.issues[0]?.message ?? "Invalid order data",
        400
      );
    }

    const order = await createOrder(payload.data);

    return NextResponse.json<OrderSuccessResponse>(
      {
        success: true,
        data: {
          message: "Order created successfully",
          order,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<OrderErrorResponse>(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.statusCode,
        }
      );
    }

    return NextResponse.json<OrderErrorResponse>(
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
    const orders = await getOrders();

    return NextResponse.json<OrdersSuccessResponse>({
      success: true,
      data: {
        message: "Orders fetched successfully",
        orders,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json<OrderErrorResponse>(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.statusCode,
        }
      );
    }

    return NextResponse.json<OrderErrorResponse>(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      {
        status: 500,
      }
    );
  }
}
