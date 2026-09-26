"use client";

import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { Image as ImageIcon } from "lucide-react";
import { categorySchema, type CategoryFormValues } from "../validations/categorySchema";
import { addCategory } from "../http/AddCategory";
import type { Category } from "../types";

type CategoryFormProps = {
  action?: "add" | "edit";
  value?: Category;
  onOpenChange: (open: boolean) => void;
}

export default function CategoryForm({
  action = "add",
  value,
  onOpenChange,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    mode: "onTouched",
    defaultValues: {
      title: value?.title || "",
      iconUrl: value?.iconUrl || "",
    },
  });

  const iconUrl = watch("iconUrl");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      toast.success("Category added successfully!", {
        duration: 3000,
      });
      reset();
      onOpenChange(false);
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    if (action !== "add") return;
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-3.5 py-3">
        <section>
          <h2 className="mb-4 text-base font-medium">Category Details</h2>

          {isError && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
              {error.message}
            </div>
          )}

          <div className="flex flex-col gap-5">
            {/* Category title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter category title"
                className={`h-9 rounded-md text-xs ${errors.title ? "border-red-500 focus-visible:ring-red-500" : ""
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
                className={`h-9 rounded-md text-xs ${errors.iconUrl ? "border-red-500 focus-visible:ring-red-500" : ""
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
            disabled={isPending}
            variant="outline"
            className="h-9 cursor-pointer rounded-md px-3.5 text-sm font-medium"
          >
            {isPending ? "Saving..." : action === "edit" ? "Save Changes" : "Save Category"}
          </Button>
        </div>
      </div>
    </form>
  );
}
