"use client";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { FilterState } from "@/types/college";
import { ALL_STATES } from "@/data/colleges";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CollegeFiltersProps {
  filters: FilterState;
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  total: number;
}

const STREAM_OPTIONS = [
  { value: "Engineering", label: "Engineering" },
  { value: "Management", label: "Management" },
  { value: "Medical", label: "Medical" },
  { value: "Law", label: "Law" },
  { value: "Arts & Science", label: "Arts & Science" },
];

const TYPE_OPTIONS = [
  { value: "Government", label: "Government" },
  { value: "Private", label: "Private" },
  { value: "Deemed", label: "Deemed" },
  { value: "Autonomous", label: "Autonomous" },
];

const EXAM_OPTIONS = [
  { value: "JEE Main", label: "JEE Main" },
  { value: "JEE Advanced", label: "JEE Advanced" },
  { value: "KCET", label: "KCET" },
  { value: "MHT CET", label: "MHT CET" },
  { value: "BITSAT", label: "BITSAT" },
  { value: "VITEEE", label: "VITEEE" },
];

const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "ranking", label: "Best Ranked (NIRF)" },
  { value: "feesasc", label: "Fees: Low to High" },
  { value: "feesdesc", label: "Fees: High to Low" },
];

const RATING_OPTIONS = [
  { value: "0", label: "Any Rating" },
  { value: "3", label: "3+ Stars" },
  { value: "3.5", label: "3.5+ Stars" },
  { value: "4", label: "4+ Stars" },
  { value: "4.5", label: "4.5+ Stars" },
];

export function CollegeFilters({ filters, onUpdate, onReset, total }: CollegeFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters =
    filters.stream || filters.type || filters.state || filters.exam || filters.minRating > 0;

  const filterContent = (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <Select
        placeholder="All Streams"
        value={filters.stream}
        options={STREAM_OPTIONS}
        onChange={(e) => onUpdate("stream", e.target.value as any)}
      />
      <Select
        placeholder="College Type"
        value={filters.type}
        options={TYPE_OPTIONS}
        onChange={(e) => onUpdate("type", e.target.value as any)}
      />
      <Select
        placeholder="All States"
        value={filters.state}
        options={ALL_STATES.map((s) => ({ value: s, label: s }))}
        onChange={(e) => onUpdate("state", e.target.value)}
      />
      <Select
        placeholder="Entrance Exam"
        value={filters.exam}
        options={EXAM_OPTIONS}
        onChange={(e) => onUpdate("exam", e.target.value as any)}
      />
      <Select
        placeholder="Min Rating"
        value={String(filters.minRating)}
        options={RATING_OPTIONS}
        onChange={(e) => onUpdate("minRating", parseFloat(e.target.value))}
      />
      <Select
        value={filters.sortBy}
        options={SORT_OPTIONS}
        onChange={(e) => onUpdate("sortBy", e.target.value as any)}
      />
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
          <span className="text-xs text-gray-400">{total} results</span>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <RotateCcw size={14} />
              Reset
            </Button>
          )}
          <button
            className="md:hidden text-sm text-blue-600 font-medium"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? "Hide" : "Show filters"}
          </button>
        </div>
      </div>

      <div className={cn("hidden md:block", mobileOpen && "!block")}>
        {filterContent}
      </div>
    </div>
  );
}
