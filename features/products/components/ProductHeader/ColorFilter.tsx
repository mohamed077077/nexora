"use client";

import type { Color } from "@/features/colors/types";
import AppSelect from "@/shared/components/AppSelect";
import { useProductFilterStore } from "../../store/useProductFilterStore";

type ColorFilterProps = {
  colors: Color[];
};

export default function ColorFilter({
  colors,
}: ColorFilterProps) {
  const color = useProductFilterStore((state) => state.color);
  const setColor = useProductFilterStore((state) => state.setColor);

  return (
    <AppSelect
      id="color-filter"
      title="Color"
      data={colors}
      value={color}
      onValueChange={(value) => {
        setColor(value as Color["_id"] || "all");
      }}
      placeholder="Color"
      allOptionLabel="All Colors"
    />
  );
}