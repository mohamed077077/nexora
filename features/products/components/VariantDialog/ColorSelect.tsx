
"use client";

import { useMemo } from "react";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { Palette } from "lucide-react";

import { useProducts } from "../../hooks/useProducts";
import { useColorStore } from "../../store/useColorStore";

import type { Product, Variant } from "../../types";


const CUSTOM_COLOR_VALUE = "__custom_color__";

type ColorSelectProps = {
  errorMessage?: string;
};

export function ColorSelect({ errorMessage }: ColorSelectProps) {
  const { data: productsData } = useProducts();

  const color = useColorStore((state) => state.color);
  const colorName = useColorStore((state) => state.colorName);

  const setColorDetails = useColorStore(
    (state) => state.setColorDetails,
  );

  const openCustomDialog = useColorStore(
    (state) => state.openCustomDialog,
  );

  const recommendedColors = useMemo(() => {
    const colorMap = new Map<string, string>();

    const addVariantColor = (variant: Variant) => {
      const rawColor = variant.color?.trim();

      if (!rawColor) return;

      // Normalize HEX casing so duplicate colors are grouped.
      const hex = rawColor.toLowerCase();
      const name = variant.colorName?.trim() || rawColor;

      colorMap.set(hex, name);
    };

    productsData?.products?.forEach((product: Product) => {
      product.variants?.forEach(addVariantColor);
    });

    return Array.from(colorMap.entries()).map(([hex, title]) => ({
      _id: hex,
      title,
    }));
  }, [productsData?.products]);

  const normalizedColor = color.trim().toLowerCase();

  const selectedColorObj = recommendedColors.find(
    (item) => item._id === normalizedColor,
  );

  const colorOptions = (
    <Select
      value={normalizedColor || null}
      onValueChange={(value) => {
        if (value === CUSTOM_COLOR_VALUE) {
        openCustomDialog();
        } else {
        const selected = recommendedColors.find(
            (item) => item._id === value
        );

        if (selected) {
            setColorDetails(selected._id, selected.title);
        }
        }
      }}
    >
      <SelectTrigger 
        id="color-select" 
        className={`h-10 w-full min-w-0 ${
          errorMessage ? "border-destructive ring-destructive" : ""
        }`}
        aria-invalid={!!errorMessage}
      >
        <SelectValue placeholder="Select color">
          {!color ? (
            <span className="text-muted-foreground">
              Select color
            </span>
          ) : (
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="size-4 shrink-0 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />

              <span className="truncate">
                {selectedColorObj?.title || colorName || color}
              </span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem
          value={CUSTOM_COLOR_VALUE}
          className="font-medium text-primary"
        >
          <span className="flex items-center gap-2">
            <Palette className="size-4 text-amber-500" />
            <span>Custom...</span>
          </span>
        </SelectItem>

        {recommendedColors.length > 0 && (
          <SelectSeparator />
        )}

        {recommendedColors.map((item) => (
          <SelectItem key={item._id} value={item._id}>
            <span className="flex items-center gap-2">
              <span
                className="size-4 shrink-0 rounded-full border border-border"
                style={{ backgroundColor: item._id }}
              />

              <span>{item.title}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="color-select" className="text-sm font-medium">
          Color
        </Label>

        {recommendedColors.length === 0 ? (
          <Button
            type="button"
            variant="outline"
            className={`h-10 w-full justify-start gap-2 ${
              errorMessage ? "border-destructive text-destructive" : ""
            }`}
            onClick={openCustomDialog}
            aria-invalid={!!errorMessage}
          >
            <Palette className="size-4 text-amber-500" />

            {color ? colorName || color : "Add Custom Color"}
          </Button>
        ) : (
          colorOptions
        )}

        {errorMessage && (
          <p className="text-xs text-destructive">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
}