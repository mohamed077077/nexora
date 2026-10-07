"use client";

import { toast } from "sonner";
import { useVariantStore } from "@/features/products/store/useDraftVariantStore";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";
import type { VariantFormValues } from "@/features/products/validations/variantSchema";
import VariantForm from "./VariantForm";

export default function AddVariantForm() {
  const close = useVariantDialogStore((state) => state.close);
  const addVariant = useVariantStore((state) => state.addVariant);
  const draft = useVariantStore((state) => state.draft);

  const handleSubmit = (data: VariantFormValues) => {
    
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
    close();
  };

  return (
    <VariantForm
      submitLabel="Add Variant"
      onSubmit={handleSubmit}
      onCancel={close}
    />
  );
}
