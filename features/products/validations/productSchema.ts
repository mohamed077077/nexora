import { z } from "zod";

export const productSchema = z.object({
  title: z.string("Product title is required").trim().min(1, "Product title is required"),
  categoryId: z
    .string("Category is required")
    .trim()
    .regex(/^[a-f\d]{24}$/i, "Please select a valid category"),
  price: z.coerce
    .number("Price is required")
    .min(0, "Price cannot be negative"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
