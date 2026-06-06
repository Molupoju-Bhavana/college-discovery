"use client";
import { useColleges } from "@/hooks/useColleges";
import { CollegeSearch } from "@/components/colleges/CollegeSearch";
import { CollegeFilters } from "@/components/colleges/CollegeFilters";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { Spinner } from "@/components/ui/Spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { BookOpen } from "lucide-react";

export default function CollegesPage() {
  const { colleges, total, filters, updateFilter, resetFilters, hasMore, loadMore } =
    useColleges();

  const sentinelRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={22} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Explore Colleges</h1>
        </div>
        <p className="text-gray-500 text-sm">Discover and compare top colleges in India</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <CollegeSearch
          value={filters.search}
          onChange={(val) => updateFilter("search", val)}
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <CollegeFilters
          filters={filters}
          onUpdate={updateFilter}
          onReset={resetFilters}
          total={total}
        />
      </div>

      {/* Results */}
      {colleges.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <div className="text-5xl mb-4">🎓</div>
          <p className="text-gray-700 font-semibold text-lg">No colleges found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-10 flex items-center justify-center mt-6">
            {hasMore && <Spinner />}
          </div>

          {!hasMore && colleges.length > 0 && (
            <p className="text-center text-gray-400 text-sm mt-4">
              Showing all {total} colleges
            </p>
          )}
        </>
      )}
    </div>
  );
}
