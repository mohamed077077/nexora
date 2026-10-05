"use client";

import ProductContent from "./ProductContent/ProductContent";
import ProductHeader from "./ProductHeader/ProductHeader";
import ProductDialog from "./ProductDialog/ProductDialog";
import AppLoading from "@/shared/components/AppLoading";
import AppError from "@/shared/components/AppError";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useColors } from "@/features/colors/hooks/useColors";
import { useCategories} from "@/features/categories/hooks/useCategories";

export default function Product() {
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErr,
  } = useProducts();

  const {
    data: colorsData,
    isLoading: colorsLoading,
    isError: colorsError,
    error: colorsErr,
  } = useColors(true);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErr,
  } = useCategories(true);

  if (productsLoading || colorsLoading || categoriesLoading) {
    return <AppLoading />;
  }

  if (productsError || colorsError || categoriesError) {
    const message =
      productsErr?.message ||
      colorsErr?.message ||
      categoriesErr?.message ||
      "Something went wrong";
    return <AppError message={message} />;
  }

  const products = productsData?.products ?? [];
  const colors = colorsData ?? [];
  const categories = categoriesData ?? [];

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <ProductHeader categories={categories} colors={colors} />
      <ProductContent products={products} />
      <ProductDialog />
    </section>
  );
}
