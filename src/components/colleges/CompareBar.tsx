"use client";
import { useCompareStore } from "@/store/compareStore";
import { getCollegeById } from "@/data/colleges";
import { Button } from "@/components/ui/Button";
import { X, GitCompare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CompareBar() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();

  if (compareIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <GitCompare size={16} className="text-blue-600" />
            Compare ({compareIds.length}/3)
          </div>

          <div className="flex items-center gap-2 flex-1 flex-wrap">
            {compareIds.map((id) => {
              const college = getCollegeById(id);
              if (!college) return null;
              return (
                <div
                  key={id}
                  className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5"
                >
                  <span className="text-sm font-medium text-blue-800">{college.shortName}</span>
                  <button
                    onClick={() => removeFromCompare(id)}
                    className="text-blue-400 hover:text-blue-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}

            {compareIds.length < 3 && (
              <div className="flex items-center gap-2 border-2 border-dashed border-gray-200 rounded-lg px-3 py-1.5">
                <span className="text-xs text-gray-400">+ Add college</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="sm" onClick={clearCompare}>
              Clear
            </Button>
            <Link href="/compare">
              <Button
                size="sm"
                disabled={compareIds.length < 2}
                className={cn(compareIds.length < 2 && "opacity-50 cursor-not-allowed")}
              >
                Compare Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
