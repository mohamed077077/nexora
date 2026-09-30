"use client";

import { useEffect, useState } from "react";

import { useCategories } from "../../hooks/useCategories";

import AppPagination from "@/shared/components/AppPagination";
import AppError from "@/shared/components/AppError";
import AppLoading from "@/shared/components/AppLoading";
import { Empty, EmptySearch } from "@/shared/components/AppEmptyState";

import CategoryDesktopTable from "./CategoryDesktopTable";
import CategoryMobileList from "./CategoryMobileList";

import { useCategorySearchStore } from "../../store/useCategorySearchStore";

export default function CategoryContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const search = useCategorySearchStore(
    (state) => state.search
  );

  const {
    data,
    isLoading,
    isError,
    error,
  } = useCategories();

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (isLoading) {
    return <AppLoading />;
  }

  if (isError) {
    return (
      <AppError
        message={
          error instanceof Error
            ? error.message
            : "Failed to load categories."
        }
      />
    );
  }

  if (!data) {
    return null;
  }

  const categories = data.categories;

  if (categories.length === 0) {
    return (
      <Empty
        title="No Categories Yet"
        description="Get started by adding your first category."
      />
    );
  }

  const filteredCategories = categories.filter((category) =>
    category.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (filteredCategories.length === 0) {
    return (
      <EmptySearch
        title="category"
        search={search}
      />
    );
  }

  const categoriesPerPage = 4;

  const totalPages = Math.ceil(
    filteredCategories.length / categoriesPerPage
  );

  const startIndex =
    (currentPage - 1) * categoriesPerPage;

  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + categoriesPerPage
  );

  return (
    <>
      <div className="hidden w-full overflow-auto rounded-2xl border border-border md:block">
        <CategoryDesktopTable
          categories={currentCategories}
        />
      </div>

      <div className="w-full overflow-hidden md:hidden">
        <CategoryMobileList
          categories={currentCategories}
        />
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
