import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid Email Address")),

  password: z.string().min(1, "Password is required"),
});

export type LoginForm = z.infer<typeof LoginSchema>;