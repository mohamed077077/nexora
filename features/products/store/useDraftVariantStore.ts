import { create } from "zustand";
import type { Variant } from "../types";

type VariantStore = {
  draft: Variant[] | null;

  startEdit: (variants: Variant[]) => void;

  addVariant: (variant: Variant) => void;

  updateVariant: (
    variantIndex: number,
    updatedVariant: Variant
  ) => void;

  deleteVariant: (variantIndex: number) => void;

  resetDraft: () => void;
};

export const useVariantStore = create<VariantStore>((set) => ({
  draft: null,

  startEdit: (variants) =>
    set({
      draft: structuredClone(variants),
    }),

  addVariant: (variant) =>
    set((state) => ({
      draft: [...(state.draft || []), variant],
    })),

  updateVariant: (variantIndex, updatedVariant) =>
    set((state) => {
      if (!state.draft) return state;

      return {
        draft: state.draft.map((variant, index) =>
          index === variantIndex ? updatedVariant : variant
        ),
      };
    }),

  deleteVariant: (variantIndex) =>
    set((state) => {
      if (!state.draft) return state;

      return {
        draft: state.draft.filter(
          (_, index) => index !== variantIndex
        ),
      };
    }),

  resetDraft: () =>
    set({
      draft: null,
    }),
}));