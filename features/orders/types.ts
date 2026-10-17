import type { ErrorResponse, SuccessResponse } from "@/shared/types/Response";
import type { Product, Variant } from "@/features/products/types";
import type { OrderStatus } from "./validations/orderSchema";

export type { OrderStatus };

export type CartItem = {
  productId: string;
  product: Product;
  variant: Variant;
  quantity: number;
};

export type OrderItemVariant = {
  color: string;
  colorName?: string;
  size: string | number;
  image: string;
  stock: number;
};

export type OrderItem = {
  _id?: string;
  productId: string | Product;
  variant: OrderItemVariant;
  quantity: number;
};

export type Order = {
  _id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerLocationUrl?: string;
  totalPrice: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
};

export type OrderSuccessResponse = SuccessResponse<{
  message: string;
  order: Order;
}>;

export type OrdersSuccessResponse = SuccessResponse<{
  message: string;
  orders: Order[];
}>;

export type OrderErrorResponse = ErrorResponse;
