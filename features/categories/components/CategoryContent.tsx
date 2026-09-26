"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AppPagination from "@/shared/components/AppPagination";
import AppError from "@/shared/components/AppError";
import AppLoading from "@/shared/components/AppLoading";
import { EmptyCategory, EmptySearch } from "./CategoryEmptyState";
import CategoryDesktopTable from "./CategoryDesktopTable";
import CategoryMobileList from "./CategoryMobileList";
import { getCategories } from "../http/GetCategories";

type CategoryContentProps = {
  search: string;
};


export default function CategoryContent({ search }: CategoryContentProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

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

      if (categories.length === 0) return <EmptyCategory />;

      const filteredCategories = categories.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );

      if (filteredCategories.length === 0) return <EmptySearch search={search} />;

      const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
      const startIndex = (currentPage - 1) * categoriesPerPage;
      const currentCategories = filteredCategories.slice(startIndex, startIndex + categoriesPerPage);

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
  }
}