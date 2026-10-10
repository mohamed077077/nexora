"use client";

import { toast } from "sonner";
import { useVariantStore } from "@/features/products/store/useDraftVariantStore";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";
import type { VariantFormValues } from "@/features/products/validations/variantSchema";
import VariantForm from "./VariantForm";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useEffect } from "react";
import { useColorStore } from "@/features/products/store/useColorStore";

export default function AddVariantForm() {
  const resetColorState = useColorStore(
  (state) => state.resetColorState
);
  const { data: products } = useProducts();
  const close = useVariantDialogStore((state) => state.close);
  const addVariant = useVariantStore((state) => state.addVariant);
  const draft = useVariantStore((state) => state.draft);

  const handleSubmit = (data: VariantFormValues) => {
    const normalizedName = data.colorName.trim().toLowerCase();
    const normalizedColor = data.color.toUpperCase();

    const hasColorConflict = products?.products?.some((product) =>
      product.variants?.some(
        (variant) =>
          variant.colorName.trim().toLowerCase() === normalizedName &&
          variant.color.toUpperCase() !== normalizedColor
      )
    );

if (hasColorConflict) {
  toast.error("This color name is already used with a different HEX value");
  return;
}
    const hasDuplicate = draft?.some(
      (variant) =>
        variant.color === data.color &&
        variant.size === data.size &&
        variant.colorName === data.colorName
    );
    if (hasDuplicate) {
      toast.error("A variant with this color and size already exists");
      return;
    }

    const variant = {
      color: data.color,
      colorName: data.colorName,
      size: data.size,
      image: data.image,
      stock: Number(data.stock),
    };

    addVariant(variant);
    toast.success("Variant added!");
    resetColorState();

    close();
  };

  useEffect(() => {
  resetColorState();
}, [resetColorState]);

  return (
    <VariantForm
      submitLabel="Add Variant"
      onSubmit={handleSubmit}
      onCancel={() => {
        resetColorState();
        close();
      }}    />
  );
}
