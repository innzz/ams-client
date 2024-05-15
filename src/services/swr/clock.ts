import useSWR from "swr";
import { getClocksData } from "../axios/clock";

export function useClocksData() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/api/clock",
    (url) => getClocksData(url)
  );

  return { data, error, isLoading, isValidating, mutate };
}
