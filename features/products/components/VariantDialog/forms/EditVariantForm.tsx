"use client";

import { toast } from "sonner";
import { useVariantStore } from "@/features/products/store/useProductStore";
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
    const hasSameColor = draft?.some(
      (v, i) => i !== index && v.colorId === data.colorId
    );

    if (hasSameColor) {
      toast.error("A variant with this color already exists");
      return;
    }

    const updatedVariant = {
      colorId: data.colorId,
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
        colorId: variant.colorId,
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
