"use client";

import { useState, useEffect } from "react";

import AppPagination from "@/shared/components/AppPagination";
import type { Product } from "@/features/products/types";
import { Empty, EmptySearch } from "@/shared/components/AppEmptyState";
import { useProductFilterStore } from "../../store/useProductFilterStore";

import ProductDesktopTable from "./ProductDesktopTable";
import ProductMobileList from "./ProductMobileList";
import ProductList from "./ProductList";

type ProductContentProps = {
  products: Product[];
  isAdmin?: boolean;
};

export default function ProductContent({ products, isAdmin }: ProductContentProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const search = useProductFilterStore((state) => state.search);
  const category = useProductFilterStore((state) => state.category);
  const color = useProductFilterStore((state) => state.color);
  const gender = useProductFilterStore((state) => state.gender);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, color, gender]);

  if (products.length === 0) {
    return (
      <Empty
        title="No Products Yet"
        description="Get started by adding your first product."
      />
    );
  }

  const filteredProducts = products.filter((product) => {
    if (search && !product.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
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
      {isAdmin ? (
        <>
          <div className="hidden w-full overflow-auto rounded-2xl border border-border md:block">
            <ProductDesktopTable products={currentProducts} />
          </div>

          <div className="w-full overflow-hidden md:hidden">
            <ProductMobileList products={currentProducts} />
          </div>
        </>
      ) : (
        <ProductList products={currentProducts} />
      )}
        {filteredProducts.length > productsPerPage &&(
      <div className="flex h-16 w-full items-center justify-between border-t border-border px-5">
          <AppPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
      </div>
        )}
    </>
  );
}
