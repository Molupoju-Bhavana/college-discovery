import { useMemo, useState, useCallback } from "react";
import { COLLEGES } from "@/data/colleges";
import { College, FilterState } from "@/types/college";

const PAGE_SIZE = 6;

const DEFAULT_FILTERS: FilterState = {
  search: "",
  stream: "",
  type: "",
  state: "",
  feeRange: [0, 3000000],
  minRating: 0,
  exam: "",
  sortBy: "rating",
};

export function useColleges() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const filtered = useMemo<College[]>(() => {
    let result = [...COLLEGES];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q) ||
          c.location.city.toLowerCase().includes(q) ||
          c.location.state.toLowerCase().includes(q)
      );
    }

    if (filters.stream) {
      result = result.filter((c) => c.stream.includes(filters.stream as any));
    }

    if (filters.type) {
      result = result.filter((c) => c.type === filters.type);
    }

    if (filters.state) {
      result = result.filter((c) => c.location.state === filters.state);
    }

    result = result.filter(
      (c) => c.fees.min >= filters.feeRange[0] && c.fees.max <= filters.feeRange[1]
    );

    if (filters.minRating > 0) {
      result = result.filter((c) => c.rating >= filters.minRating);
    }

    if (filters.exam) {
      result = result.filter((c) => c.acceptedExams.includes(filters.exam as any));
    }

    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "feesasc":
        result.sort((a, b) => a.fees.min - b.fees.min);
        break;
      case "feesdesc":
        result.sort((a, b) => b.fees.max - a.fees.max);
        break;
      case "ranking":
        result.sort((a, b) => (a.ranking.nirf ?? 999) - (b.ranking.nirf ?? 999));
        break;
    }

    return result;
  }, [filters]);

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);

  const hasMore = paginated.length < filtered.length;

  const loadMore = useCallback(() => setPage((p) => p + 1), []);

  return {
    colleges: paginated,
    total: filtered.length,
    filters,
    updateFilter,
    resetFilters,
    hasMore,
    loadMore,
  };
}
