"use client";

import ProductContent from "./ProductContent/ProductContent";
import ProductHeader from "./ProductHeader/ProductHeader";
import AppLoading from "@/shared/components/AppLoading";
import AppError from "@/shared/components/AppError";
import { Empty } from "@/shared/components/AppEmptyState";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useColorsWithProducts } from "@/features/colors/hooks/useColors";
import { useCategoriesWithProducts } from "@/features/categories/hooks/useCategories";

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
  } = useColorsWithProducts();

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErr,
  } = useCategoriesWithProducts();

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
  const colors = colorsData?.colors ?? [];
  const categories = categoriesData?.categories ?? [];

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <ProductHeader categories={categories} colors={colors} />
      {products.length === 0 ? (
        <Empty
          title="No Products Yet"
          description="You haven't added any products. Click 'Add Product' to get started."
        />
      ) : (
        <ProductContent products={products} />
      )}
    </section>
  );
}
