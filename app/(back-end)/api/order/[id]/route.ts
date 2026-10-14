import { NextResponse } from "next/server";

import { AppError } from "@/lib/AppError";

import { deleteOrder } from "@/features/orders/services/Delete";
import { getOrderById } from "@/features/orders/services/Read";
import { updateOrderStatus } from "@/features/orders/services/Update";
import { updateOrderStatusSchema } from "@/features/orders/validations/orderSchema";

import type {
  OrderErrorResponse,
  OrderSuccessResponse,
} from "@/features/orders/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const order = await getOrderById(id);

    return NextResponse.json<OrderSuccessResponse>({
      success: true,
      data: {
        message: "Order fetched successfully",
        order,
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
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const payload = updateOrderStatusSchema.safeParse(body);
    if (!payload.success) {
      throw new AppError(
        payload.error.issues[0]?.message ?? "Invalid order status",
        400
      );
    }

    const order = await updateOrderStatus(id, payload.data.status);

    return NextResponse.json<OrderSuccessResponse>({
      success: true,
      data: {
        message: "Order status updated successfully",
        order,
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

    const order = await deleteOrder(id);

    return NextResponse.json<OrderSuccessResponse>({
      success: true,
      data: {
        message: "Order deleted successfully",
        order,
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
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
