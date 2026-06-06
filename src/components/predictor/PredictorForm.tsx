"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { College, Exam } from "@/types/college";
import { COLLEGES } from "@/data/colleges";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { Lightbulb, AlertCircle, ChevronRight } from "lucide-react";

const EXAM_OPTIONS: { value: Exam; label: string }[] = [
  { value: "JEE Main", label: "JEE Main" },
  { value: "JEE Advanced", label: "JEE Advanced" },
  { value: "KCET", label: "KCET" },
  { value: "MHT CET", label: "MHT CET" },
  { value: "BITSAT", label: "BITSAT" },
  { value: "VITEEE", label: "VITEEE" },
];

function predictColleges(
  exam: Exam,
  rank: number
): { college: College; chance: "High" | "Medium" | "Low" }[] {
  return COLLEGES.filter((c) => c.acceptedExams.includes(exam))
    .map((c) => {
      const cutoff = c.cutoffs[exam] ?? 0;
      const isRankBased = ["JEE Main", "JEE Advanced", "KCET", "MHT CET"].includes(exam);
      let chance: "High" | "Medium" | "Low";

      if (isRankBased) {
        if (rank <= cutoff * 0.7) chance = "High";
        else if (rank <= cutoff * 1.2) chance = "Medium";
        else chance = "Low";
      } else {
        if (rank >= cutoff * 1.1) chance = "High";
        else if (rank >= cutoff * 0.85) chance = "Medium";
        else chance = "Low";
      }
      return { college: c, chance };
    })
    .sort((a, b) => {
      const order = { High: 0, Medium: 1, Low: 2 };
      return order[a.chance] - order[b.chance];
    });
}

const CHANCE_STYLES = {
  High: "bg-green-100 text-green-700 border-green-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-red-100 text-red-700 border-red-200",
};

export function PredictorForm() {
  const [exam, setExam] = useState<Exam | "">("");
  const [rank, setRank] = useState("");
  const [results, setResults] = useState<ReturnType<typeof predictColleges> | null>(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePredict = () => {
    if (!exam) {
      setError("Please select an exam.");
      return;
    }
    const rankNum = parseInt(rank);
    if (!rank || isNaN(rankNum) || rankNum <= 0) {
      setError("Enter a valid rank/score.");
      return;
    }
    setError("");
    setResults(predictColleges(exam as Exam, rankNum));
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Lightbulb size={16} className="text-purple-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Enter Your Details</h2>
            <p className="text-xs text-gray-400">We'll predict your admission chances</p>
          </div>
        </div>

        <div className="space-y-4">
          <Select
            label="Entrance Exam"
            placeholder="Select exam"
            value={exam}
            options={EXAM_OPTIONS}
            onChange={(e) => setExam(e.target.value as Exam)}
          />
          <Input
            label={
              ["JEE Main", "JEE Advanced", "KCET", "MHT CET"].includes(exam)
                ? "Your Rank"
                : "Your Score / Rank"
            }
            placeholder={
              exam === "BITSAT"
                ? "e.g. 350"
                : exam === "VITEEE"
                ? "e.g. 1000"
                : "e.g. 5000"
            }
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            min={1}
          />

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <Button onClick={handlePredict} size="lg" className="w-full">
            Predict My Colleges
            <ChevronRight size={16} />
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          ⚠️ Predictions are indicative based on historical cutoff patterns. Always verify with
          official sources.
        </p>
      </div>

      {/* Results */}
      {submitted && results && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Predicted Colleges</h2>
            <span className="text-sm text-gray-400">({results.length} matches)</span>
          </div>

          {results.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-amber-700 font-medium">
                No colleges found for the selected exam.
              </p>
              <p className="text-sm text-amber-600 mt-1">Try a different exam or rank.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {(["High", "Medium", "Low"] as const).map((chance) => {
                const group = results.filter((r) => r.chance === chance);
                if (!group.length) return null;
                return (
                  <div key={chance}>
                    <div
                      className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full border mb-4 ${CHANCE_STYLES[chance]}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current opacity-70" />
                      {chance} Chance ({group.length})
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.map(({ college }) => (
                        <CollegeCard key={college.id} college={college} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
