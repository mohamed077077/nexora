"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppImagePreview from "@/shared/components/AppImagePreview";
import AppSelect from "@/shared/components/AppSelect";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";

import {
  variantSchema,
  type VariantFormValues,
} from "../../../validations/variantSchema";

import { useColors } from "@/features/colors/hooks/useColors";

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
    control,
    formState: { errors },
  } = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema),
    mode: "onTouched",

    defaultValues: {
      colorId: defaultValues?.colorId ?? "",
      size: defaultValues?.size ?? "",
      image: defaultValues?.image ?? "",
      stock: defaultValues?.stock,
    },
  });

  const { data: colorsData } = useColors();

  const colors = colorsData ?? [];

  const imageUrl = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 px-3.5 py-4">
        <Controller
          name="colorId"
          control={control}
          render={({ field, fieldState }) => (
            <AppSelect
              id="variant-color"
              title="Color"
              placeholder="Select color"
              data={colors}
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
                field.onBlur();
              }}
              onOpenChange={(open) => {
                if (!open) {
                  field.onBlur();
                }
              }}
              error={fieldState.error?.message}
            />
          )}
        />


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