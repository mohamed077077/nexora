"use client";

import AppSearchBar from "@/shared/components/AppSearchBar";
import { useOrderSearchStore } from "@/features/orders/store/OrderSearchStore";
import StatusFilter from "./StatusFilter";

export default function Header() {
  const search = useOrderSearchStore((state) => state.search);
  const setSearch = useOrderSearchStore((state) => state.setSearch);

  return (
    <div className="flex w-full flex-col gap-4 ">
      <div className="w-full ">
        <AppSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by customer name or phone..."
        />
      </div>

      <StatusFilter />
    </div>
  );
}
