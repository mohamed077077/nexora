"use client";

import AppSearchBar from "@/shared/components/AppSearchBar";
import AppAddButton from "@/shared/components/AppAddButton";

import { useCategoryDialogStore } from "../store/useCategoryDialogStore";
import { useCategorySearchStore } from "../store/useCategorySearchStore";

export default function CategoryHeader() {
  const search = useCategorySearchStore((state) => state.search);
  const setSearch = useCategorySearchStore((state) => state.setSearch);

  const openAdd = useCategoryDialogStore((state) => state.openAdd);

  return (
    <div className="flex w-full items-center gap-3">
      <AppSearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search categories..."
      />

      <AppAddButton
        label="Add Category"
        ariaLabel="Add category"
        onClick={openAdd}
      />
    </div>
  );
}