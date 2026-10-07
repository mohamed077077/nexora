"use client";

import AppAddButton from "@/shared/components/AppAddButton";
import AppSearchBar from "@/shared/components/AppSearchBar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";

import type { Category } from "@/features/categories/types";

import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";

import { useProductFilterStore } from "../../store/useProductFilterStore";
import { useProductDialogStore } from "../../store/useProductDialogStore";

type ProductColor = {
  _id: string;
  title: string;
  count: number;
};

type ProductHeaderProps = {
  categories: Category[];
  colors: ProductColor[];
};

const PRICE_OPTIONS = [
  {
    value: "all",
    label: "All Prices",
  },
  {
    value: "0-50",
    label: "$0 - $50",
  },
  {
    value: "50-100",
    label: "$50 - $100",
  },
  {
    value: "100-plus",
    label: "Over $100",
  },
];

export default function ProductHeader({
  categories,
  colors,
}: ProductHeaderProps) {
  const openAddProduct = useProductDialogStore(
    (state) => state.openAddProduct
  );

  const search = useProductFilterStore((state) => state.search);
  const setSearch = useProductFilterStore((state) => state.setSearch);

  const price = useProductFilterStore((state) => state.price);
  const setPrice = useProductFilterStore((state) => state.setPrice);

  const selectedPrice = PRICE_OPTIONS.find(
    (option) => option.value === price
  );

  const hasCategories = categories.length > 0;
  const hasColors = colors.length > 0;
  const showPriceFilter = hasCategories && hasColors;

  return (
    <div className="grid w-full gap-3 lg:flex lg:items-center">
      <AppSearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search products..."
      />

      <div className="grid min-w-0 grid-cols-3 gap-3 lg:flex">
        {hasColors && (
          <CategoryFilter categories={categories} />
        )}

        {hasColors && (
          <ColorFilter colors={colors} />
        )}

        {showPriceFilter && (
          <div className="w-full space-y-1.5 lg:w-35 lg:shrink-0">
            <Label
              htmlFor="price-filter"
              className="text-sm font-medium"
            >
              Price
            </Label>

            <Select
              value={price}
              onValueChange={(value) => {
                setPrice(value ?? "all");
              }}
            >
              <SelectTrigger
                id="price-filter"
                className="h-10 w-full min-w-0 whitespace-nowrap"
              >
                <SelectValue placeholder="Price">
                  {selectedPrice?.label}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {PRICE_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <AppAddButton
        label="Add Product"
        ariaLabel="Add product"
        onClick={openAddProduct}
      />
    </div>
  );
}