"use client";
import { College } from "@/types/college";
import { formatCurrency } from "@/lib/utils";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { Check, Trophy } from "lucide-react";

interface CompareTableProps {
  colleges: College[];
}

interface Row {
  label: string;
  key: string;
  render: (college: College) => React.ReactNode;
  highlight?: (colleges: College[]) => string | null;
}

function bestId(colleges: College[], getValue: (c: College) => number, mode: "max" | "min") {
  let best = colleges[0];
  for (const c of colleges) {
    const val = getValue(c);
    const bestVal = getValue(best);
    if (mode === "max" ? val > bestVal : val < bestVal) best = c;
  }
  return best.id;
}

const ROWS: Row[] = [
  {
    label: "Location",
    key: "location",
    render: (c) => `${c.location.city}, ${c.location.state}`,
  },
  {
    label: "Type",
    key: "type",
    render: (c) => <Badge variant="blue">{c.type}</Badge>,
  },
  {
    label: "NIRF Ranking",
    key: "nirf",
    render: (c) =>
      c.ranking.nirf ? (
        <div className="flex items-center gap-1">
          <Trophy size={14} className="text-amber-500" />
          <span className="font-semibold">#{c.ranking.nirf}</span>
        </div>
      ) : (
        <span className="text-gray-400">—</span>
      ),
    highlight: (cs) => {
      const ranked = cs.filter((c) => c.ranking.nirf);
      if (!ranked.length) return null;
      return bestId(ranked, (c) => -(c.ranking.nirf ?? 999), "max");
    },
  },
  {
    label: "NAAC Grade",
    key: "naac",
    render: (c) => <span className="font-semibold">{c.naacGrade}</span>,
  },
  {
    label: "Min Fees / Year",
    key: "feesmin",
    render: (c) => <span className="font-semibold">{formatCurrency(c.fees.min)}</span>,
    highlight: (cs) => bestId(cs, (c) => c.fees.min, "min"),
  },
  {
    label: "Max Fees / Year",
    key: "feesmax",
    render: (c) => <span className="font-semibold">{formatCurrency(c.fees.max)}</span>,
    highlight: (cs) => bestId(cs, (c) => c.fees.max, "min"),
  },
  {
    label: "Overall Rating",
    key: "rating",
    render: (c) => <RatingStars rating={c.rating} size="sm" />,
    highlight: (cs) => bestId(cs, (c) => c.rating, "max"),
  },
  {
    label: "Avg Package",
    key: "avgpackage",
    render: (c) => (
      <span className="font-semibold text-green-700">{c.placements.avgPackage} LPA</span>
    ),
    highlight: (cs) => bestId(cs, (c) => c.placements.avgPackage, "max"),
  },
  {
    label: "Highest Package",
    key: "highpackage",
    render: (c) => <span className="font-semibold">{c.placements.highestPackage} LPA</span>,
    highlight: (cs) => bestId(cs, (c) => c.placements.highestPackage, "max"),
  },
  {
    label: "Placement Rate",
    key: "placementrate",
    render: (c) => (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-20">
          <div
            className="bg-green-500 h-1.5 rounded-full"
            style={{ width: `${c.placements.placementRate}%` }}
          />
        </div>
        <span className="text-sm font-medium">{c.placements.placementRate}%</span>
      </div>
    ),
    highlight: (cs) => bestId(cs, (c) => c.placements.placementRate, "max"),
  },
  {
    label: "Top Recruiters",
    key: "recruiters",
    render: (c) => (
      <div className="flex flex-wrap gap-1">
        {c.placements.topRecruiters.slice(0, 3).map((r) => (
          <Badge key={r} variant="gray">{r}</Badge>
        ))}
      </div>
    ),
  },
  {
    label: "Accepted Exams",
    key: "exams",
    render: (c) => (
      <div className="flex flex-wrap gap-1">
        {c.acceptedExams.map((e) => (
          <Badge key={e} variant="blue">{e}</Badge>
        ))}
      </div>
    ),
  },
  {
    label: "Established",
    key: "year",
    render: (c) => c.establishedYear,
  },
];

export function CompareTable({ colleges }: CompareTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 font-semibold text-gray-500 w-44 min-w-40">
              Criteria
            </th>
            {colleges.map((c) => (
              <th key={c.id} className="px-4 py-3 text-center min-w-52">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700">
                      {c.shortName.slice(0, 2)}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900 text-xs leading-tight">
                    {c.shortName}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, idx) => {
            const highlightId = row.highlight ? row.highlight(colleges) : null;
            return (
              <tr
                key={row.key}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
              >
                <td className="px-4 py-3 text-gray-500 font-medium border-r border-gray-100">
                  {row.label}
                </td>
                {colleges.map((c) => (
                  <td
                    key={c.id}
                    className={`px-4 py-3 text-center ${
                      highlightId === c.id ? "bg-green-50" : ""
                    }`}
                  >
                    <div className="flex justify-center items-center gap-1">
                      {row.render(c)}
                      {highlightId === c.id && (
                        <span title="Best in category">
                          <Check size={13} className="text-green-600 shrink-0" />
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
