"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon, Loader2 } from "lucide-react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";

import {
  categorySchema,
  type CategoryFormValues,
} from "../../validations/categorySchema";

type CategoryFormProps = {
  defaultValues?: CategoryFormValues;
  error?: Error | null;
  isPending?: boolean;
  submitLabel: string;
  onSubmit: (data: CategoryFormValues) => void;
  onCancel: () => void;
};

export default function CategoryForm({
  defaultValues,
  error,
  isPending = false,
  submitLabel,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    mode: "onTouched",
    defaultValues: {
      title: defaultValues?.title ?? "",
      iconUrl: defaultValues?.iconUrl ?? "",
    },
  });

  const iconUrl = watch("iconUrl");

  useEffect(() => {
    reset({
      title: defaultValues?.title ?? "",
      iconUrl: defaultValues?.iconUrl ?? "",
    });
  }, [defaultValues?.title, defaultValues?.iconUrl, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-3.5 py-3">
        <section>
          <h2 className="mb-4 text-base font-medium">
            Category Details
          </h2>

          {error instanceof Error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
              {error.message}
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="title"
                className="text-sm font-medium"
              >
                Title
              </Label>

              <Input
                id="title"
                placeholder="Enter category title"
                {...register("title")}
                aria-invalid={!!errors.title}
              />

              {errors.title && (
                <p className="text-xs text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="iconUrl"
                className="text-sm font-medium"
              >
                Icon URL
              </Label>

              <Input
                id="iconUrl"
                placeholder="Enter image URL"
                {...register("iconUrl")}
                aria-invalid={!!errors.iconUrl}
              />

              {errors.iconUrl && (
                <p className="text-xs text-red-500">
                  {errors.iconUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/50">
                {iconUrl && !errors.iconUrl ? (
                  <img
                    src={iconUrl}
                    alt="Category icon preview"
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="mb-2 size-8 opacity-50" />
                    <span className="text-xs">
                      No image provided
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="my-4 border-t border-border" />

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              onCancel();
            }}
            className="h-9 rounded-md px-3.5 text-sm font-medium"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            variant="outline"
            className="h-9 rounded-md px-3.5 text-sm font-medium"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving…
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}