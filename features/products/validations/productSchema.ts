import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string("Product title is required")
    .trim()
    .min(1, "Product title is required"),

  categoryId: z
    .string("Category is required")
    .trim()
    .min(1, "Category is required"),

  price: z
    .number("Price is required")
    .min(1, "Price cannot be negative"),
});

export type ProductFormValues = z.infer<typeof productSchema>;



