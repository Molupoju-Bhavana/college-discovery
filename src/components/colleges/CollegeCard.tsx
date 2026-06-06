"use client";
import { College } from "@/types/college";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Trophy, GitCompare, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useCompareStore } from "@/store/compareStore";

interface CollegeCardProps {
  college: College;
}

const TYPE_VARIANT: Record<College["type"], "blue" | "green" | "purple" | "orange"> = {
  Government: "green",
  Private: "blue",
  Deemed: "purple",
  Autonomous: "orange",
};

export function CollegeCard({ college }: CollegeCardProps) {
  const { addToCompare, removeFromCompare, isInCompare, compareIds } = useCompareStore();
  const inCompare = isInCompare(college.id);
  const canAddMore = compareIds.length < 3;

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCompare) removeFromCompare(college.id);
    else if (canAddMore) addToCompare(college.id);
  };

  return (
    <Card hover className="flex flex-col">
      {/* Header */}
      <div className="relative h-36 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-xl flex items-center justify-center overflow-hidden">
        <div className="text-center px-4">
          <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-2">
            <span className="text-xl font-bold text-blue-600">
              {college.shortName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <p className="text-xs font-medium text-blue-700">{college.shortName}</p>
        </div>
        {college.ranking.nirf && (
          <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Trophy size={10} />
            #{college.ranking.nirf} NIRF
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
              {college.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <MapPin size={11} />
            {college.location.city}, {college.location.state}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          <Badge variant={TYPE_VARIANT[college.type]}>{college.type}</Badge>
          {college.stream.map((s) => (
            <Badge key={s} variant="gray">{s}</Badge>
          ))}
          <Badge variant="blue">NAAC {college.naacGrade}</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-gray-400 mb-0.5">Annual Fees</p>
            <p className="font-semibold text-gray-800">
              {formatCurrency(college.fees.min)}
              {college.fees.min !== college.fees.max && ` – ${formatCurrency(college.fees.max)}`}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-gray-400 mb-0.5">Avg Package</p>
            <p className="font-semibold text-gray-800">{college.placements.avgPackage} LPA</p>
          </div>
        </div>

        <RatingStars rating={college.rating} totalRatings={college.totalRatings} size="sm" />

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <Button
            variant={inCompare ? "secondary" : "outline"}
            size="sm"
            onClick={toggleCompare}
            disabled={!inCompare && !canAddMore}
            className="flex-1"
            title={!canAddMore && !inCompare ? "Max 3 colleges" : ""}
          >
            {inCompare ? (
              <>
                <Check size={13} className="text-green-600" />
                <span className="text-green-700">Added</span>
              </>
            ) : (
              <>
                <GitCompare size={13} />
                Compare
              </>
            )}
          </Button>
          <Link href={`/colleges/${college.id}`} className="flex-1">
            <Button size="sm" className="w-full">
              View
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
