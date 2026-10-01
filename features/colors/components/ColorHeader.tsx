"use client";

import AppAddButton from "@/shared/components/AppAddButton";
import AppSearchBar from "@/shared/components/AppSearchBar";
import { useColorDialogStore } from "../store/useColorDialogStore";
import { useColorSearchStore } from "../store/useColorSearchStore";

export default function ColorHeader() {
  const search = useColorSearchStore((state) => state.search);
  const setSearch = useColorSearchStore((state) => state.setSearch);
  const openAdd = useColorDialogStore((state) => state.openAdd);

  return (
    <div className="flex w-full items-center gap-3">
      <AppSearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search colors..."
      />
      <AppAddButton label="Add Color" ariaLabel="Add color" onClick={openAdd} />
    </div>
  );
}
