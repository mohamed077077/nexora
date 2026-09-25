"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { Image as ImageIcon } from "lucide-react";
import { Category } from "./data";
import { categorySchema, type CategoryFormValues } from "../validations/categorySchema";

interface CategoryFormProps {
  action?: "add" | "edit";
  value?: Category;
}

export default function CategoryForm({
  action = "add",
  value,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    mode: "onTouched",
    defaultValues: {
      title: value?.title || "",
      iconUrl: value?.image || "",
    },
  });

  const iconUrl = watch("iconUrl");

  return (
    <form >
      <div className="px-3.5 py-3">
        <section>
          <h2 className="mb-4 text-base font-medium">Category Details</h2>

          <div className="flex flex-col gap-5">
            {/* Category title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter category title"
                className={`h-9 rounded-md text-xs ${
                  errors.title ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Icon URL */}
            <div className="space-y-1.5">
              <Label htmlFor="iconUrl" className="text-sm font-medium">
                Icon URL
              </Label>
              <Input
                id="iconUrl"
                placeholder="Enter image URL"
                className={`h-9 rounded-md text-xs ${
                  errors.iconUrl ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
                {...register("iconUrl")}
              />
              {errors.iconUrl && (
                <p className="text-xs text-red-500">{errors.iconUrl.message}</p>
              )}
            </div>

            {/* Icon Preview */}
            <div className="space-y-1.5">
              <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/50">
                {iconUrl && !errors.iconUrl ? (
                  <img
                    src={iconUrl}
                    alt="Category Icon Preview"
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="mb-2 size-8 opacity-50" />
                    <span className="text-xs">No image provided</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer divider */}
        <div className="my-4 border-t border-border" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            className="h-9 cursor-pointer rounded-md px-3.5 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="h-9 cursor-pointer rounded-md px-3.5 text-sm font-medium"
          >
            {action === "edit" ? "Save Changes" : "Save Category"}
          </Button>
        </div>
      </div>
    </form>
  );
}
