import { useQuery } from "@tanstack/react-query";
import { getColors } from "../http/GetColors";

export function useColors() {
  return useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
}
