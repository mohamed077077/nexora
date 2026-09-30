"use client";

import { useState } from "react";
import AppError from "@/shared/components/AppError";
import { Empty, EmptySearch } from "@/shared/components/AppEmptyState";
import AppLoading from "@/shared/components/AppLoading";
import AppPagination from "@/shared/components/AppPagination";
import { useColors } from "../../hooks/useColors";
import { useColorSearchStore } from "../../store/useColorSearchStore";
import ColorDesktopTable from "./ColorDesktopTable";
import ColorMobileList from "./ColorMobileList";

export default function ColorContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const search = useColorSearchStore((state) => state.search);
  const { data, isLoading, isError, error } = useColors();

  if (isLoading) return <AppLoading />;
  if (isError) {
    return <AppError message={error instanceof Error ? error.message : "Failed to load colors."} />;
  }
  if (!data) return null;
  if (data.colors.length === 0) {
    return <Empty title="No Colors Yet" description="Get started by adding your first color." />;
  }

  const filteredColors = data.colors.filter((color) =>
    color.title.toLowerCase().includes(search.toLowerCase())
  );
  if (filteredColors.length === 0) {
    return <EmptySearch title="color" search={search} />;
  }

  const colorsPerPage = 4;
  const totalPages = Math.ceil(filteredColors.length / colorsPerPage);
  const activePage = Math.min(currentPage, totalPages);
  const currentColors = filteredColors.slice(
    (activePage - 1) * colorsPerPage,
    activePage * colorsPerPage
  );

  return (
    <>
      <div className="hidden w-full overflow-auto rounded-2xl border border-border md:block">
        <ColorDesktopTable colors={currentColors} />
      </div>
      <div className="w-full overflow-hidden md:hidden">
        <ColorMobileList colors={currentColors} />
      </div>
      <div className="flex h-16 w-full items-center justify-between border-t border-border px-5">
        <AppPagination
          currentPage={activePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
