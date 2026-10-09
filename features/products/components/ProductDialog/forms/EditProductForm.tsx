"use client";

import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateProduct } from "@/features/products/http/UpdateProduct";
import { useProductDialogStore } from "@/features/products/store/useProductDialogStore";
import { useVariantStore } from "@/features/products/store/useDraftVariantStore";
import type { ProductFormValues } from "@/features/products/validations/productSchema";
import type { Product } from "@/features/products/types";

import ProductForm from "./ProductForm";

type EditProductFormProps = {
  product: Product;
};

export default function EditProductForm({ product }: EditProductFormProps) {
  const queryClient = useQueryClient();
  const close = useProductDialogStore((state) => state.close);
  const startEdit = useVariantStore((state) => state.startEdit);
  const resetDraft = useVariantStore((state) => state.resetDraft);

  useEffect(() => {
    startEdit(product.variants ?? []);
    return () => {
      resetDraft();
    };
  }, [product.variants, startEdit, resetDraft]);

  const {
    mutate: update,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: ProductFormValues) =>
      updateProduct(product._id, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["products"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["colors"],
        }),
      ]);
      toast.success("Product updated successfully!", {
        duration: 3000,
      });
      resetDraft();
      close();
    },
  });

  return (
    <ProductForm
      defaultValues={{
        title: product.title,
        categoryId: product.categoryId,
        price: product.price,
        gender: product.gender,
      }}
      onCancel={() => {
        resetDraft();
        close();
      }}
      onSubmit={update}
      isPending={isPending}
      error={error}
      submitLabel="Save Changes"
    />
  );
}
