import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../http/GetOrders";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}
