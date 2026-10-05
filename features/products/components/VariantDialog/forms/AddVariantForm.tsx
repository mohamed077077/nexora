"use client";

import { toast } from "sonner";
import { useVariantStore } from "@/features/products/store/useProductStore";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";
import type { VariantFormValues } from "@/features/products/validations/variantSchema";
import VariantForm from "./VariantForm";

export default function AddVariantForm() {
  const close = useVariantDialogStore((state) => state.close);
  const addVariant = useVariantStore((state) => state.addVariant);
  const draft = useVariantStore((state) => state.draft);

  const handleSubmit = (data: VariantFormValues) => {
    const hasSameColor = draft?.some((v) => v.colorId === data.colorId);

    if (hasSameColor) {
      toast.error("A variant with this color already exists");
      return;
    }

    const variant = {
      colorId: data.colorId,
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
