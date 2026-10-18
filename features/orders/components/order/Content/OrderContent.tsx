"use client";

import { useEffect, useState } from "react";

import { useOrders } from "@/features/orders/hooks/useOrders";
import { useOrderSearchStore } from "@/features/orders/store/OrderSearchStore";

import AppPagination from "@/shared/components/AppPagination";
import AppError from "@/shared/components/AppError";
import AppLoading from "@/shared/components/AppLoading";
import { Empty, EmptySearch } from "@/shared/components/AppEmptyState";

import OrderDesktopTable from "./OrderDesktopTable";
import OrderMobileList from "./OrderMobileList";
import type { Order } from "@/features/orders/types";

export default function OrderContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const search = useOrderSearchStore((state) => state.search);
  const status = useOrderSearchStore((state) => state.status);

  const { data, isLoading, isError, error } = useOrders();

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  if (isLoading) {
    return <AppLoading isAdmin />;
  }

  if (isError) {
    return (
      <AppError
        message={
          error instanceof Error ? error.message : "Failed to load orders."
        }
      />
    );
  }

  if (!data) {
    return null;
  }

  const orders = data;

  if (orders.length === 0) {
    return (
      <Empty
        title="No Orders Yet"
        description="When customers place orders, they will appear here."
      />
    );
  }

  const query = search.trim().toLowerCase();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      query === "" ||
      order.customerName?.toLowerCase().includes(query) ||
      order.customerPhone?.toLowerCase().includes(query) ||
      order.customerAddress?.toLowerCase().includes(query);

    const matchesStatus = status === "all" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  if (filteredOrders.length === 0) {
    return (
      <EmptySearch
        title="orders"
        search={query || status}
      />
    );
  }

  const ordersPerPage = 4;

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const startIndex = (currentPage - 1) * ordersPerPage;

  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  return (
    <>
      <div className="hidden w-full overflow-auto rounded-2xl border border-border md:block">
        <OrderDesktopTable orders={currentOrders} />
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-border md:hidden">
        <OrderMobileList orders={currentOrders} />
      </div>

      {filteredOrders.length > ordersPerPage && <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />}
    </>
  );
}
