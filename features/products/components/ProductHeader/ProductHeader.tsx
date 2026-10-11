"use client";

import AppAddButton from "@/shared/components/AppAddButton";
import AppSearchBar from "@/shared/components/AppSearchBar";

import type { Category } from "@/features/categories/types";
import type { AppSelectItem } from "@/shared/components/AppSelect";

import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import GenderFilter from "./GenderFilter";

import { useProductFilterStore } from "../../store/useProductFilterStore";
import { useProductDialogStore } from "../../store/useProductDialogStore";
import { useProducts } from "../../hooks/useProducts";
type ProductColor = {
  _id: string;
  title: string;
  count: number;
};

type ProductHeaderProps = {
  categories: Category[];
  colors: ProductColor[];
  genders: AppSelectItem[];
};

export default function ProductHeader({
  categories,
  colors,
  genders,
}: ProductHeaderProps) {
  const openAddProduct = useProductDialogStore(
    (state) => state.openAddProduct
  );

  const search = useProductFilterStore((state) => state.search);
  const setSearch = useProductFilterStore((state) => state.setSearch);
  const { data: productsData } = useProducts();
  const products = productsData ?? [];
  const color = useProductFilterStore((state) => state.color);
  const category = useProductFilterStore((state) => state.category);
  const gender = useProductFilterStore((state) => state.gender);



  const hasCategories = categories.length > 0;
  const hasColors = colors.length > 0;
  const hasGenders = genders.length > 0;
  const showGenderFilter = hasCategories && hasColors && hasGenders;

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

        {showGenderFilter && (
          <GenderFilter genders={genders} />
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