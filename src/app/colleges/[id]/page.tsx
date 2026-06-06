import { COLLEGES, getCollegeById } from "@/data/colleges";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatCurrency } from "@/lib/utils";
import {
  MapPin,
  Trophy,
  Building2,
  Calendar,
  BookOpen,
  TrendingUp,
  Users,
  Star,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return COLLEGES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const college = getCollegeById(params.id);
  return {
    title: college ? `${college.name} — CollegeFinder` : "College Not Found",
  };
}

export default function CollegeDetailPage({ params }: Props) {
  const college = getCollegeById(params.id);
  if (!college) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <span className="text-2xl font-bold text-blue-600">
              {college.shortName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{college.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-blue-100 text-sm mb-4">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {college.location.city}, {college.location.state}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Est. {college.establishedYear}
              </span>
              <span className="flex items-center gap-1">
                <Building2 size={14} />
                {college.type}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {college.ranking.nirf && (
                <div className="flex items-center gap-1.5 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  <Trophy size={12} />
                  NIRF #{college.ranking.nirf}
                </div>
              )}
              <div className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                NAAC {college.naacGrade}
              </div>
              {college.approvedBy.map((a) => (
                <div key={a} className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
                  {a} Approved
                </div>
              ))}
            </div>
          </div>
          <div className="text-right shrink-0">
            <RatingStars rating={college.rating} totalRatings={college.totalRatings} />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Annual Fees",
            value: `${formatCurrency(college.fees.min)} – ${formatCurrency(college.fees.max)}`,
            icon: BookOpen,
            color: "text-blue-600",
          },
          {
            label: "Avg Package",
            value: `${college.placements.avgPackage} LPA`,
            icon: TrendingUp,
            color: "text-green-600",
          },
          {
            label: "Highest Package",
            value: `${college.placements.highestPackage} LPA`,
            icon: Trophy,
            color: "text-amber-600",
          },
          {
            label: "Placement Rate",
            value: `${college.placements.placementRate}%`,
            icon: Users,
            color: "text-purple-600",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <Icon size={20} className={`${color} mx-auto mb-1`} />
            <p className="text-lg font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{college.overview}</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              {college.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </section>

          {/* Courses */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <span className="flex items-center gap-2">
                <BookOpen size={18} className="text-blue-600" />
                Courses Offered
              </span>
            </h2>
            <div className="space-y-3">
              {college.courses.map((course) => (
                <div
                  key={course.name}
                  className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{course.name}</p>
                    <p className="text-xs text-gray-400">
                      {course.duration} · {course.seats} seats
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600 text-sm">
                      {formatCurrency(course.fees)}
                    </p>
                    <p className="text-xs text-gray-400">per year</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Placements */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <span className="flex items-center gap-2">
                <TrendingUp size={18} className="text-green-600" />
                Placement Report {college.placements.year}
              </span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-700">
                  {college.placements.avgPackage} LPA
                </p>
                <p className="text-xs text-green-600 mt-1">Average Package</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-amber-700">
                  {college.placements.highestPackage} LPA
                </p>
                <p className="text-xs text-amber-600 mt-1">Highest Package</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {college.placements.placementRate}%
                </p>
                <p className="text-xs text-blue-600 mt-1">Placement Rate</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Top Recruiters</p>
              <div className="flex flex-wrap gap-2">
                {college.placements.topRecruiters.map((r) => (
                  <Badge key={r} variant="gray">{r}</Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <span className="flex items-center gap-2">
                <Star size={18} className="text-amber-500" />
                Student Reviews
              </span>
            </h2>
            <div className="space-y-5">
              {college.reviews.map((review) => (
                <div key={review.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(review.date).toLocaleDateString("en-IN", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <RatingStars rating={review.rating} size="sm" />
                  </div>
                  <p className="font-medium text-gray-800 text-sm mb-1">{review.title}</p>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{review.body}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-medium text-green-600 mb-1">Pros</p>
                      {review.pros.map((p) => (
                        <div key={p} className="flex items-center gap-1.5 text-xs text-gray-600">
                          <CheckCircle2 size={11} className="text-green-500 shrink-0" />
                          {p}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-red-500 mb-1">Cons</p>
                      {review.cons.map((c) => (
                        <div key={c} className="flex items-center gap-1.5 text-xs text-gray-600">
                          <XCircle size={11} className="text-red-400 shrink-0" />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Accepted Exams */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Accepted Exams</h3>
            <div className="flex flex-wrap gap-2">
              {college.acceptedExams.map((e) => (
                <Badge key={e} variant="blue">{e}</Badge>
              ))}
            </div>
          </div>

          {/* Streams */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Streams</h3>
            <div className="flex flex-wrap gap-2">
              {college.stream.map((s) => (
                <Badge key={s} variant="purple">{s}</Badge>
              ))}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Quick Facts</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Established", value: college.establishedYear },
                { label: "Type", value: college.type },
                { label: "NAAC Grade", value: college.naacGrade },
                { label: "City", value: college.location.city },
                { label: "State", value: college.location.state },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-gray-50 pb-1 last:border-0 last:pb-0"
                >
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
