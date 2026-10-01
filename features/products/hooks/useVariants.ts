import { useQuery } from "@tanstack/react-query";
import { getVariants } from "../http/variant/GetVariants";

export function useVariants() {
  return useQuery({
    queryKey: ["variants"],
    queryFn: getVariants,
  });
}
