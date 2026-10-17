
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";

import CartButton from "@/features/orders/components/cart/CartButton";
import { handleAddToCart } from "@/features/orders/actions/handleAddtoCart";

import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

import type { Product } from "@/features/products/types";
import { useProductFilterStore } from "@/features/products/store/useProductFilterStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

type ProductCardProps = {
  product: Product;
};

function normalizeColor(color?: string | null) {
  return color?.trim().toLowerCase() ?? "";
}

function getInitialVariant(
  variants: Product["variants"],
  filterColor: string,
) {
  const availableVariants = variants ?? [];

  const matchingVariant =
    filterColor && filterColor !== "all"
      ? availableVariants.find(
          (variant) =>
            normalizeColor(variant.color) ===
            normalizeColor(filterColor),
        )
      : null;

  return matchingVariant ?? availableVariants[0];
}

export default function ProductCard({ product }: ProductCardProps) {
  const color = useProductFilterStore((state) => state.color);

  const variants = product.variants.filter((variant) => variant.stock>0) ?? [];
  const firstVariant = variants[0];

  const [selectedVariant, setSelectedVariant] = useState(() =>
    getInitialVariant(variants, color),
  );

  // Sync the card when the global color filter changes.
  useEffect(() => {
    setSelectedVariant(getInitialVariant(variants, color));
  }, [product._id, product.variants, color]);

  const shownImage =
    selectedVariant?.image?.trim() ||
    firstVariant?.image?.trim() ||
    null;

  function handleColorChange(nextColor: string) {
    const colorVariants = variants.filter(
      (variant) =>
        normalizeColor(variant.color) ===
        normalizeColor(nextColor),
    );

    const nextVariant =
      colorVariants.find(
        (variant) =>
          String(variant.size) ===
          String(selectedVariant?.size),
      ) ?? colorVariants[0];

    if (nextVariant) {
      setSelectedVariant(nextVariant);
    }
  }

  function handleSizeChange(nextSize: string) {
    const sizeVariants = variants.filter(
      (variant) => String(variant.size) === nextSize,
    );

    const nextVariant =
      sizeVariants.find(
        (variant) =>
          normalizeColor(variant.color) ===
          normalizeColor(selectedVariant?.color),
      ) ?? sizeVariants[0];

    if (nextVariant) {
      setSelectedVariant(nextVariant);
    }
  }

  
const colors = variants
  .filter(
    (variant, index, allVariants) =>
      allVariants.findIndex(
        (item) =>
          normalizeColor(item.color) ===
          normalizeColor(variant.color),
      ) === index,
  );

const variantsForSelectedColor = selectedVariant
  ? variants.filter(
      (variant) =>
        normalizeColor(variant.color) ===
        normalizeColor(selectedVariant.color),
    )
  : variants;

const sizes = variantsForSelectedColor
  .map((variant) => String(variant.size ?? "").trim())
  .filter(
    (size, index, allSizes) =>
      Boolean(size) && allSizes.indexOf(size) === index,
  );

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/5 gap-0 py-0">
      {/* Product Image */}
      
        <div className="relative aspect-square overflow-hidden bg-muted/25">
          {shownImage ? (
            <Image
              src={shownImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.05] sm:p-6"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageIcon className="size-8 stroke-[1.5]" />
              <span className="text-xs">No image available</span>
            </div>
          )}
        </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Product Title */}
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-foreground">
          {product.title}
        </h3>

        {/* Price */}
        <p className="mt-2 text-lg font-semibold tracking-tight text-foreground tabular-nums">
          ${product.price.toFixed(2)}
        </p>

        {/* Product Options */}
        <div className="mt-4 flex min-w-0 items-center gap-2">
          {/* Color Swatches */}
          <div className="flex min-w-0 flex-1 items-center gap-1">
            {colors.map((variant) => {
              const isSelected =
                normalizeColor(selectedVariant?.color) ===
                normalizeColor(variant.color);

              return (
                <Button
                  key={variant.color}
                  variant="ghost"
                  size="icon"
                  title={variant.colorName || variant.color}
                  aria-label={`Select ${variant.colorName || variant.color}`}
                  aria-pressed={isSelected}
                  onClick={() =>
                    handleColorChange(variant.color)
                  }
                  className={`size-7 shrink-0 rounded-full ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                      : "hover:scale-110"
                  }`}
                >
                  <span
                    className="size-4 rounded-full border border-black/10"
                    style={{
                      backgroundColor: variant.color,
                    }}
                  />
                </Button>
              );
            })}
          </div>

          {/* Size Selector */}
          {sizes.length === 1 ? (
            <span className="flex h-8 w-18 shrink-0 items-center justify-center rounded-xl border border-input bg-transparent px-3 text-sm font-medium whitespace-nowrap border-border bg-background shadow-none dark:bg-input/30">
              {sizes[0].toUpperCase()}
            </span>
          ) : sizes.length > 1 ? (
            <Select
              value={String(selectedVariant?.size ?? "")}
              onValueChange={(value) => {
                if (value) handleSizeChange(value);
              }}
            >
              <SelectTrigger
                aria-label="Select size"
                className="h-9 w-18 shrink-0 rounded-xl border-border bg-background px-3 text-sm font-medium shadow-none"
              >
                <SelectValue placeholder="Size" />
              </SelectTrigger>

              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}

          {/* Add to Cart */}
          <CartButton
            ariaLabel={`Add ${product.title} to cart`}
            onClick={()=>handleAddToCart(product, selectedVariant)}
          />
        </div>
      </div>
    </Card>
  );
}