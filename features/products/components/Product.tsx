"use client";

import ProductContent from "./ProductContent/ProductContent";
import ProductHeader from "./ProductHeader/ProductHeader";
import ProductDialog from "./ProductDialog/ProductDialog";
import AppLoading from "@/shared/components/AppLoading";
import AppError from "@/shared/components/AppError";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCategories} from "@/features/categories/hooks/useCategories";
import { getColors, getGenders, getCategories, getMatchingProducts } from "@/lib/utils";
import { useProductFilterStore } from "@/features/products/store/useProductFilterStore";

export default function Product({ isAdmin }: { isAdmin?: boolean }) {
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


  const color = useProductFilterStore((state) => state.color);
  const category = useProductFilterStore((state) => state.category);
  const gender = useProductFilterStore((state) => state.gender);

  const allproducts = productsData?.products ?? [];
  const filteredProducts = allproducts.filter((product) => product.variants.some((variant) => variant.stock>0));4
  const products = isAdmin? allproducts : filteredProducts;
  const colors = getColors(products, { color, gender, category });
  const genders = getGenders(products, { color, gender, category });
  const categories = getCategories(products, categoriesData ?? [], { color, gender, category });
  const matchingProducts = getMatchingProducts(products, { color, gender, category });


  if (productsLoading || categoriesLoading) {
    return <AppLoading isAdmin={isAdmin} />;
  }

  if (productsError || categoriesError) {
    const message =
      productsErr?.message ||
      categoriesErr?.message ||
      "Something went wrong";
    return <AppError message={message} />;
  }



  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-6">
      <ProductHeader categories={categories} colors={colors} genders={genders} isAdmin={isAdmin} />
      <ProductContent products={matchingProducts}  isAdmin={isAdmin}/>
      {isAdmin && <ProductDialog />}
    </section>
  );
}
