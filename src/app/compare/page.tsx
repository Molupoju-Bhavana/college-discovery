"use client";
import { useCompareStore } from "@/store/compareStore";
import { getCollegeById } from "@/data/colleges";
import { CompareTable } from "@/components/compare/CompareTable";
import { Button } from "@/components/ui/Button";
import { GitCompare, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();
  const colleges = compareIds
    .map((id) => getCollegeById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCollegeById>>[];

  if (compareIds.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <GitCompare size={36} className="text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">No Colleges to Compare</h1>
        <p className="text-gray-500 mb-8">
          Add 2–3 colleges from the listing page to compare them side by side.
        </p>
        <Link href="/colleges">
          <Button size="lg">
            Browse Colleges
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    );
  }

  if (compareIds.length < 2) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <GitCompare size={48} className="text-blue-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Add one more college</h2>
        <p className="text-gray-400 mb-6 text-sm">
          You need at least 2 colleges to compare. Go back and add another.
        </p>
        <Link href="/colleges">
          <Button variant="outline">← Back to Colleges</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitCompare size={22} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Compare Colleges</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Comparing {colleges.length} colleges · Highlighted cells indicate the best value
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearCompare}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            Clear All
          </Button>
          <Link href="/colleges">
            <Button variant="ghost" size="sm">
              + Add More
            </Button>
          </Link>
        </div>
      </div>

      {/* College Chips */}
      <div className="flex flex-wrap gap-3 mb-6">
        {colleges.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2"
          >
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-white">{c.shortName.slice(0, 2)}</span>
            </div>
            <span className="font-medium text-blue-900 text-sm">{c.shortName}</span>
            <button
              onClick={() => removeFromCompare(c.id)}
              className="text-blue-300 hover:text-blue-600 ml-1"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Table */}
      <CompareTable colleges={colleges} />
    </div>
  );
}
