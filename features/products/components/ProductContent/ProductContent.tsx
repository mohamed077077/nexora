"use client";

import { useState } from "react";

import AppPagination from "@/shared/components/AppPagination";
import type { Product } from "@/features/products/types";

import ProductDesktopTable from "./ProductDesktopTable";
import ProductMobileList from "./ProductMobileList";

type ProductContentProps = {
  products: Product[];
};

export default function ProductContent({ products }: ProductContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
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
