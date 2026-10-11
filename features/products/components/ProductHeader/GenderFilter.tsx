"use client";

import type { AppSelectItem } from "@/shared/components/AppSelect";
import AppSelect from "@/shared/components/AppSelect";
import { useProductFilterStore } from "../../store/useProductFilterStore";

type GenderFilterProps = {
  genders: AppSelectItem[];
};

export default function GenderFilter({
  genders,
}: GenderFilterProps) {
  const gender = useProductFilterStore(
    (state) => state.gender
  );

  const setGender = useProductFilterStore(
    (state) => state.setGender
  );

  return (
    <AppSelect
      id="gender-filter"
      title="Gender"
      data={genders}
      value={gender}
      onValueChange={(value) => {
        setGender(value as string || "all");
      }}
      placeholder="Gender"
    />
  );
}
