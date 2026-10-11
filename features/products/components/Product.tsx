"use client";

import ProductContent from "./ProductContent/ProductContent";
import ProductHeader from "./ProductHeader/ProductHeader";
import ProductDialog from "./ProductDialog/ProductDialog";
import AppLoading from "@/shared/components/AppLoading";
import AppError from "@/shared/components/AppError";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCategories} from "@/features/categories/hooks/useCategories";
import { getProductColors, getProductGenders, sortCategoriesByProductCount } from "@/lib/utils";


export default function Product() {
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErr,
  } = useProducts();


  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErr,
  } = useCategories(true);

  if (productsLoading || categoriesLoading) {
    return <AppLoading />;
  }

  if (productsError || categoriesError) {
    const message =
      productsErr?.message ||
      categoriesErr?.message ||
      "Something went wrong";
    return <AppError message={message} />;
  }

  const products = productsData?.products ?? [];
  const colors = getProductColors(products);
  const genders = getProductGenders(products);
  const categories = sortCategoriesByProductCount(categoriesData ?? []);

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <ProductHeader categories={categories} colors={colors} genders={genders} />
      <ProductContent products={products} />
      <ProductDialog />
    </section>
  );
}
