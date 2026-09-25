"use client";

import { useState } from "react";

import AppPagination from "@/shared/components/AppPagination";
import { EmptyCategory, EmptySearch } from "./CategoryEmptyState";
import { categories } from "./data";
import CategoryDesktopTable from "./CategoryDesktopTable";
import CategoryMobileList from "./CategoryMobileList";

interface CategoryTableProps {
  search: string;
}

export default function CategoryTable({ search }: CategoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (categories.length === 0) {
    return <EmptyCategory />;
  }

  const categoriesPerPage = 4;

  const filteredCategories = categories.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredCategories.length === 0) {
    return <EmptySearch search={search} />;
  }

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const startIndex = (currentPage - 1) * categoriesPerPage;

  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + categoriesPerPage
  )

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden w-full overflow-auto rounded-2xl border border-border md:block">
        <CategoryDesktopTable categories={currentCategories} />
      </div>

      {/* MOBILE */}
      <div className="w-full overflow-hidden md:hidden">
        <CategoryMobileList categories={currentCategories} />
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