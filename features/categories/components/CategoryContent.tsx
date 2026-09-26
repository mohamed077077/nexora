"use client";

import { useState } from "react";
import { useCategories } from "../hooks/useCategories";

import AppPagination from "@/shared/components/AppPagination";
import AppError from "@/shared/components/AppError";
import AppLoading from "@/shared/components/AppLoading";
import { Empty, EmptySearch } from "@/shared/components/AppEmptyState";
import CategoryDesktopTable from "./CategoryDesktopTable";
import CategoryMobileList from "./CategoryMobileList";
import CategoryDialog from "./CategoryDialog";

import type { Category } from "../types";

type CategoryContentProps = {
  search: string;
};

export default function CategoryContent({ search }: CategoryContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const { data, isLoading, isError, error } = useCategories();

  const handleEdit = (category: Category) => {
    setEditCategory(category);
  };

  const handleEditOpenChange = (open: boolean) => {
    if (!open) setEditCategory(null);
  };

  switch (true) {
    case isLoading:
      return <AppLoading />;

    case isError:
      return (
        <AppError
          message={error instanceof Error ? error.message : "Failed to load categories."}
        />
      );

    case !!data: {
      const categories = data.categories;
      const categoriesPerPage = 4;

      if (categories.length === 0)
        return (
          <Empty
            title="No Categories Yet"
            description="Get started by adding your first category."
          />
        );

      const filteredCategories = categories.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );

      if (filteredCategories.length === 0)
        return <EmptySearch title="category" search={search} />;

      const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
      const startIndex = (currentPage - 1) * categoriesPerPage;
      const currentCategories = filteredCategories.slice(startIndex, startIndex + categoriesPerPage);

      return (
        <>
          {/* Edit Dialog */}
          <CategoryDialog
            open={!!editCategory}
            onOpenChange={handleEditOpenChange}
            action="edit"
            value={editCategory ?? undefined}
          />

          {/* DESKTOP */}
          <div className="hidden w-full overflow-auto rounded-2xl border border-border md:block">
            <CategoryDesktopTable
              categories={currentCategories}
              onEdit={handleEdit}
            />
          </div>

          {/* MOBILE */}
          <div className="w-full overflow-hidden md:hidden">
            <CategoryMobileList
              categories={currentCategories}
              onEdit={handleEdit}
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
  }
}