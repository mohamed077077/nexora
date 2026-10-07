"use client";

import { toast } from "sonner";
import { useVariantStore } from "@/features/products/store/useDraftVariantStore";
import { useVariantDialogStore } from "@/features/products/store/useVariantDialogStore";
import type { Variant } from "@/features/products/types";
import type { VariantFormValues } from "@/features/products/validations/variantSchema";
import VariantForm from "./VariantForm";

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

  const handleSubmit = (data: VariantFormValues) => {
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
