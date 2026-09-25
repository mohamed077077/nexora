import { z } from "zod";

export const categorySchema = z.object({
  title: z
    .string("Title is required")
    .trim()
    .min(1, "Title is required"),

  iconUrl: z
    .string("Icon URL is required")
    .trim()
    .min(1, "Icon URL is required")
    .pipe(
      z.url("Please enter a valid image URL")
    ),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;