import { z } from "zod";

export const ORDER_STATUS = [
  "pending",
  "confirmed",
  "success",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUS)[number];

export const orderItemVariantSchema = z.object({
  color: z
    .string("Color is required")
    .trim()
    .min(1, "Color is required"),

  colorName: z.string().trim(),

  size: z.union([
    z.string().trim().min(1, "Size is required"),
    z.number(),
  ]),

  image: z
    .string("Image is required")
    .trim()
    .min(1, "Image is required"),

  stock: z
    .number("Stock is required")
    .int("Stock must be an integer")
    .min(1, "Stock must be at least 1"),
});

export const orderItemSchema = z.object({
  productId: z.string().trim(),

  variant: orderItemVariantSchema,

  quantity: z
    .number("Quantity is required")
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
});

export const orderSchema = z.object({
  customerName: z
    .string("Customer name is required")
    .trim()
    .min(2, "Customer name is required"),

  customerPhone: z
    .string("Customer phone is required")
    .trim()
    .min(7, "Valid phone number is required"),

  customerAddress: z
    .string("Customer address is required")
    .trim()
    .min(5, "Address is required"),

  customerLocationUrl: z.string().trim(),

  totalPrice: z
    .number("Total price is required")
    .min(0, "Total price cannot be negative"),

  status: z
    .enum(ORDER_STATUS, {
      error: "Status must be pending, confirmed, success, or cancelled",
    })
    .default("pending")
    .optional(),

  items: z
    .array(orderItemSchema)
    .min(1, "Order must have at least one item"),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUS, {
    error: "Status must be pending, confirmed, success, or cancelled",
  }),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
export type UpdateOrderStatusValues = z.infer<typeof updateOrderStatusSchema>;
export type OrderItemValues = z.infer<typeof orderItemSchema>;
