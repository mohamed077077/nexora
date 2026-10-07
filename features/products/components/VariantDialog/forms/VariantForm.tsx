"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppImagePreview from "@/shared/components/AppImagePreview";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";

import {
  variantSchema,
  type VariantFormValues,
} from "../../../validations/variantSchema";

type VariantFormProps = {
  defaultValues?: Partial<VariantFormValues>;
  submitLabel: string;
  onSubmit: (data: VariantFormValues) => void;
  onCancel: () => void;
};

export default function VariantForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onCancel,
}: VariantFormProps) {
  const [imageError, setImageError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema),
    mode: "onTouched",

    defaultValues: {
      color: defaultValues?.color ?? "#000000",
      colorName: defaultValues?.colorName ?? "",
      size: defaultValues?.size ?? "",
      image: defaultValues?.image ?? "",
      stock: defaultValues?.stock,
    },
  });

  const color = watch("color");
  const imageUrl = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 px-3.5 py-4">
        {/* Color + Color Name */}
        <div className="grid grid-cols-2 gap-3">
          {/* Color */}
          <div className="space-y-1.5">
            <Label
              htmlFor="variant-color"
              className="text-sm font-medium"
            >
              Color
            </Label>

            <div className="flex h-9 items-center gap-3 rounded-md border border-input px-2.5">
              <div className="relative size-6 shrink-0">
                <span
                  className="block size-6 rounded-full border border-border"
                  style={{
                    backgroundColor: color || "#000000",
                  }}
                />

                <Input
                  id="variant-color"
                  type="color"
                  {...register("color")}
                  aria-invalid={!!errors.color}
                  className="absolute inset-0 size-6 cursor-pointer rounded-full border-0 p-0 opacity-0"
                />
              </div>

              <span className="truncate text-xs font-medium uppercase text-muted-foreground">
                {color || "#000000"}
              </span>
            </div>

            {errors.color && (
              <p className="text-xs text-destructive">
                {errors.color.message}
              </p>
            )}
          </div>

          {/* Color Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="variant-color-name"
              className="text-sm font-medium"
            >
              Color Name
            </Label>

            <Input
              id="variant-color-name"
              type="text"
              placeholder="Red"
              {...register("colorName")}
              aria-invalid={!!errors.colorName}
              className="h-9 rounded-md text-sm"
            />

            {errors.colorName && (
              <p className="text-xs text-destructive">
                {errors.colorName.message}
              </p>
            )}
          </div>
        </div>

        {/* Size + Stock */}
        <div className="grid grid-cols-2 gap-3">
          {/* Size */}
          <div className="space-y-1.5">
            <Label
              htmlFor="variant-size"
              className="text-sm font-medium"
            >
              Size
            </Label>

            <Input
              id="variant-size"
              placeholder="M, L, 42"
              {...register("size")}
              aria-invalid={!!errors.size}
              className="h-9 rounded-md text-sm"
            />

            {errors.size && (
              <p className="text-xs text-destructive">
                {errors.size.message}
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="space-y-1.5">
            <Label
              htmlFor="variant-stock"
              className="text-sm font-medium"
            >
              Stock
            </Label>

            <Input
              id="variant-stock"
              type="number"
              min="0"
              placeholder="0"
              {...register("stock", {
                valueAsNumber: true,
              })}
              aria-invalid={!!errors.stock}
              className="h-9 rounded-md text-sm"
            />

            {errors.stock && (
              <p className="text-xs text-destructive">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        {/* Image */}
        <AppImagePreview
          id="variant-image"
          label="Image URL"
          imageUrl={imageUrl}
          imageError={imageError}
          onImageError={() => setImageError(true)}
          error={errors.image?.message}
          fit="cover"
          {...register("image")}
        />

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setImageError(false);
              onCancel();
            }}
            className="h-9 rounded-md px-3.5 text-sm font-medium"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="h-9 rounded-md px-3.5 text-sm font-medium"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}