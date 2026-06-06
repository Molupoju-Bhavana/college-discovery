import { PredictorForm } from "@/components/predictor/PredictorForm";
import { Lightbulb, Info } from "lucide-react";

export default function PredictorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={22} className="text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">College Admission Predictor</h1>
        </div>
        <p className="text-gray-500 text-sm max-w-xl">
          Enter your entrance exam and rank to discover colleges sorted by your admission
          probability.
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 max-w-xl">
        <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Predictions are based on historical cutoff patterns. For rank-based exams (JEE, KCET), a
          lower rank is better. For score-based exams (BITSAT, VITEEE), a higher score is better.
        </p>
      </div>

      <PredictorForm />
    </div>
  );
}
