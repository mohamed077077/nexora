"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";

import { useProductFilterStore } from "../../store/useProductFilterStore";

type ProductColor = {
  _id: string;
  title: string;
  count: number;
};

type ColorFilterProps = {
  colors: ProductColor[];
};

export default function ColorFilter({
  colors,
}: ColorFilterProps) {
  const color = useProductFilterStore((state) => state.color);
  const setColor = useProductFilterStore((state) => state.setColor);

  const selectedColor = colors.find(
    (item) => item._id === color
  );

  return (
    <div className="w-full space-y-1.5 lg:w-35 lg:shrink-0">
      <Label
        htmlFor="color-filter"
        className="text-sm font-medium"
      >
        Color
      </Label>

      <Select
        value={color}
        onValueChange={(value) => {
          setColor(value ?? "all");
        }}
      >
        <SelectTrigger
          id="color-filter"
          className="h-10 w-full min-w-0"
        >
          <SelectValue placeholder="Color">
            {color === "all" ? (
              <span className="flex items-center gap-2">
                <span className="size-4 rounded-full border border-border bg-muted" />
                <span>All Colors</span>
              </span>
            ) : selectedColor ? (
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="size-4 shrink-0 rounded-full border border-border"
                  style={{
                    backgroundColor: selectedColor._id,
                  }}
                />

                <span className="truncate">
                  {selectedColor.title}
                </span>
              </span>
            ) : null}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">
            <span className="flex items-center gap-2">
              <span className="size-4 rounded-full border border-border bg-muted" />
              <span>All Colors</span>
            </span>
          </SelectItem>

          {colors.map((item) => (
            <SelectItem
              key={item._id}
              value={item._id}
            >
              <span className="flex items-center gap-2">
                <span
                  className="size-4 shrink-0 rounded-full border border-border"
                  style={{
                    backgroundColor: item._id,
                  }}
                />

                <span>{item.title}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}