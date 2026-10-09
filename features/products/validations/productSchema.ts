import { z } from "zod";

export const GENDER_OPTIONS = ["men", "women", "boys", "girls", "all"] as const;
export type Gender = (typeof GENDER_OPTIONS)[number];

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

  gender: z.enum(GENDER_OPTIONS, {
    error: "Gender is required",
  }),
});

export type ProductFormValues = z.infer<typeof productSchema>;



