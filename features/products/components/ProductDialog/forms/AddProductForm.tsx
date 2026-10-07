"use client";

import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addProduct } from "../../../http/AddProduct";
import { useProductDialogStore } from "../../../store/useProductDialogStore";
import { useVariantStore } from "../../../store/useDraftVariantStore";

import ProductForm from "./ProductForm";

export default function AddProductForm() {
  const queryClient = useQueryClient();
  const close = useProductDialogStore((state) => state.close);
  const startEdit = useVariantStore((state) => state.startEdit);
  const resetDraft = useVariantStore((state) => state.resetDraft);

  useEffect(() => {
    startEdit([]);
    return () => {
      resetDraft();
    };
  }, [startEdit, resetDraft]);

  const {
    mutate: add,
    isPending,
    error,
  } = useMutation({
    mutationFn: addProduct,
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
      toast.success("Product added successfully!", {
        duration: 3000,
      });
      resetDraft();
      close();
    },
  });

  return (
    <ProductForm
      onCancel={() => {
        resetDraft();
        close();
      }}
      onSubmit={add}
      isPending={isPending}
      error={error}
      submitLabel="Save Product"
    />
  );
}
