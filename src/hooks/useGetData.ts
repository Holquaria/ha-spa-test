
import { useState, useMemo } from "react";
import { mockData } from "@/data/mockData";
import { sortByCategory, sortByDate, sortByTitle } from "@/lib/sort";

export type SortKey = "category" | "date" | "title";

export const useGetData = () => {
  const [sortBy, setSortBy] = useState<SortKey>("category");

  const data = useMemo(() => {
    if (sortBy === "category") return sortByCategory(mockData);
    if (sortBy === "date") return sortByDate(mockData);
    return sortByTitle(mockData);
  }, [sortBy]);

  return { data, sortBy, setSortBy };
};