"use client";

import type { Category } from "@/features/categories/types";
import AppSelect from "@/shared/components/AppSelect";
import { useProductFilterStore } from "../../store/useProductFilterStore";

type CategoryFilterProps = {
  categories: Category[];
};

export default function CategoryFilter({
  categories,
}: CategoryFilterProps) {
  const category = useProductFilterStore(
    (state) => state.category
  );

  const setCategory = useProductFilterStore(
    (state) => state.setCategory
  );

  return (
    <AppSelect
      id="category-filter"
      title="Category"
      data={categories}
      value={category}
      onValueChange={(value) => {
        setCategory(value as Category["_id"] || "all");
      }}
      placeholder="Category"
      allOptionLabel="All Categories"
    />
  );
}