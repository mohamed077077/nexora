"use client";

import { useState, useEffect } from "react";

import AppPagination from "@/shared/components/AppPagination";
import type { Product } from "@/features/products/types";
import { Empty, EmptySearch } from "@/shared/components/AppEmptyState";
import { useProductFilterStore } from "../../store/useProductFilterStore";

import ProductDesktopTable from "./ProductDesktopTable";
import ProductMobileList from "./ProductMobileList";

type ProductContentProps = {
  products: Product[];
};

export default function ProductContent({ products }: ProductContentProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const search = useProductFilterStore((state) => state.search);
  const category = useProductFilterStore((state) => state.category);
  const color = useProductFilterStore((state) => state.color);
  const price = useProductFilterStore((state) => state.price);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, color, price]);

  if (products.length === 0) {
    return (
      <Empty
        title="No Products Yet"
        description="Get started by adding your first product."
      />
    );
  }

  const filteredProducts = products.filter((product) => {
    // 1. Search
    if (search && !product.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // 2. Category
    if (category !== "all" && product.categoryId !== category) {
      return false;
    }
    
    // 3. Color
    if (color !== "all" && !product.variants.some((v) => v.colorId === color)) {
      return false;
    }
    
    // 4. Price
    if (price !== "all") {
      if (price === "0-50" && (product.price < 0 || product.price > 50)) return false;
      if (price === "50-100" && (product.price <= 50 || product.price > 100)) return false;
      if (price === "100-plus" && product.price <= 100) return false;
    }

    return true;
  });

  if (filteredProducts.length === 0) {
    return (
      <EmptySearch
        title="product"
        search={search || "these filters"}
      />
    );
  }

  const productsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <>
      <div className="hidden w-full overflow-auto rounded-2xl border border-border md:block">
        <ProductDesktopTable products={currentProducts} />
      </div>

      <div className="w-full overflow-hidden md:hidden">
        <ProductMobileList products={currentProducts} />
      </div>

      <div className="flex h-16 w-full items-center justify-between border-t border-border px-5">
        <AppPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
