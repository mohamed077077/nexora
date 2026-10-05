import { z } from "zod";

export const variantSchema = z.object({
  colorId: z
    .string("Color is required")
    .trim()
    .min(1, "Color is required"),

  size: z
    .string("Size is required")
    .trim()
    .min(1, "Size is required"),

  image: z
    .string("Image is required")
    .trim()
    .min(1, "Image is required"),

  stock: z
    .number("Stock is required")
    .min(0, "Stock cannot be negative"),
});

export type VariantFormValues = z.infer<typeof variantSchema>;