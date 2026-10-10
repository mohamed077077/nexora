"use client";

import { toast } from "sonner";
import { useVariantStore } from "@/features/products/store/useDraftVariantStore";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";
import type { Variant } from "@/features/products/types";
import type { VariantFormValues } from "@/features/products/validations/variantSchema";
import VariantForm from "./VariantForm";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useEffect } from "react";
import { useColorStore } from "@/features/products/store/useColorStore";

type EditVariantFormProps = {
  variant: Variant;
  index: number;
};

export default function EditVariantForm({
  variant,
  index,
}: EditVariantFormProps) {
  const close = useVariantDialogStore((state) => state.close);
  const updateVariant = useVariantStore((state) => state.updateVariant);
  const draft = useVariantStore((state) => state.draft);
  const resetColorState = useColorStore(
  (state) => state.resetColorState
);
const setColorDetails = useColorStore(
  (state) => state.setColorDetails
);

useEffect(() => {
  setColorDetails(
    variant.color || "#000000",
    variant.colorName || ""
  );
}, [
  variant.color,
  variant.colorName,
  setColorDetails,
]);
  const { data: products } = useProducts();

  const handleSubmit = (data: VariantFormValues) => {
    const normalizedName = data.colorName.trim().toLowerCase();
    const normalizedColor = data.color.toUpperCase();

    const hasColorConflict = products?.products?.some((product) =>
      product.variants?.some(
        (v) =>
          v.colorName.trim().toLowerCase() === normalizedName &&
          v.color.toUpperCase() !== normalizedColor
      )
    );

    if (hasColorConflict) {
      toast.error("This color name is already used with a different HEX value");
      return;
    }
    const hasDuplicate = draft?.some(
      (v, i) =>
        i !== index &&
        v.color === data.color &&
        v.size === data.size &&
        v.colorName === data.colorName
    );
    if (hasDuplicate) {
      toast.error("A variant with this color and size already exists");
      return;
    }

    const updatedVariant = {
      color: data.color,
      colorName: data.colorName,
      size: data.size,
      image: data.image,
      stock: data.stock,
    };

    updateVariant(index, updatedVariant);
    toast.success("Variant updated!");
    resetColorState();
    close();
  };

  return (
    <VariantForm
      defaultValues={{
        color: variant.color,
        colorName: variant.colorName,
        size: String(variant.size),
        image: variant.image,
        stock: variant.stock,
      }}
      submitLabel="Save Changes"
      onSubmit={handleSubmit}
      onCancel={close}
    />
  );
}
