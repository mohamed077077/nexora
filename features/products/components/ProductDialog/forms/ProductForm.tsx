"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import AppSelect from "@/shared/components/AppSelect";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useVariantStore } from "@/features/products/store/useProductStore";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";

import VariantTable from "../../VariantDialog/VariantTable";

import {
  productSchema,
  type ProductFormValues,
} from "../../../validations/productSchema";

type ProductFormProps = {
  defaultValues?: Partial<ProductFormValues>;
  error?: Error | null;
  isPending?: boolean;
  submitLabel: string;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
};

export default function ProductForm({
  defaultValues,
  error,
  isPending = false,
  submitLabel,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const { data: categoriesData } = useCategories();
  const categories = categoriesData ?? [];

  const openAddVariant = useVariantDialogStore((state) => state.openAddVariant);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onTouched",

    defaultValues: {
      title: defaultValues?.title ?? "",
      categoryId: defaultValues?.categoryId ?? "",
      price: defaultValues?.price,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-3.5 py-3">

        <section>
          <h2 className="mb-4 text-base font-medium">
            Basic Information
          </h2>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-destructive">
              {error.message}
            </div>
          )}

          <div className="grid grid-cols-[1fr_116px] gap-x-6 gap-y-5">

            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">
                Product Title
              </Label>

              <Input
                id="title"
                placeholder="Enter product title"
                {...register("title")}
                aria-invalid={!!errors.title}
                className="h-9 rounded-md text-xs"
              />

              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Category */}
            <Controller
              name="categoryId"
              control={control}
              render={({ field, fieldState }) => (
                <AppSelect
                  id="categoryId"
                  title="Category"
                  placeholder="Categories"
                  data={categories}
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                    field.onBlur();
                  }}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                  error={fieldState.error?.message}
                />
              )}
            />

            {/* Price */}
            <div className="w-50 space-y-1.5">
              <Label htmlFor="price">
                Base Price
              </Label>

              <Input
                id="price"
                type="number"
                step="1"
                placeholder="0.00"
                {...register("price", {
                  valueAsNumber: true,
                })}
                aria-invalid={!!errors.price}
                className="h-9 rounded-md text-sm"
              />

              {errors.price && (
                <p className="text-xs text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

          </div>
        </section>

        <div className="my-4 border-t border-border" />

        {/* Variants */}
        <section>
          <h2 className="mb-4 text-base font-medium">
            Variants
          </h2>

          <VariantTable />

          <Button
            type="button"
            onClick={openAddVariant}
            className="mt-5 h-9 rounded-md px-3 text-sm font-medium"
          >
            <Plus className="mr-1.5 size-4" />
            Add Variant
          </Button>
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
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
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