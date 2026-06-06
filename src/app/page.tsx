import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Search, GitCompare, Lightbulb, TrendingUp, Star, Users } from "lucide-react";

const STATS = [
  { label: "Colleges Listed", value: "8+", icon: TrendingUp },
  { label: "Student Reviews", value: "50K+", icon: Star },
  { label: "Monthly Users", value: "2L+", icon: Users },
];

const FEATURES = [
  {
    icon: Search,
    title: "Smart College Search",
    desc: "Filter by exam, stream, fees, state, and ratings to find your ideal college.",
    href: "/colleges",
    color: "bg-blue-100 text-blue-600",
    cta: "Browse Colleges",
  },
  {
    icon: GitCompare,
    title: "Side-by-Side Compare",
    desc: "Compare up to 3 colleges across fees, placements, rankings, and more.",
    href: "/compare",
    color: "bg-purple-100 text-purple-600",
    cta: "Start Comparing",
  },
  {
    icon: Lightbulb,
    title: "Admission Predictor",
    desc: "Enter your exam rank and instantly see colleges with High/Medium/Low chances.",
    href: "/predictor",
    color: "bg-green-100 text-green-600",
    cta: "Predict Now",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="bg-green-400 w-2 h-2 rounded-full" />
            Trusted by 2 lakh+ students
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <br />
            <span className="text-blue-200">College in India</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Search, compare, and predict admissions across India&apos;s top engineering, management, and
            medical colleges — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/colleges">
              <Button size="lg" variant="secondary" className="font-semibold">
                <Search size={18} />
                Explore Colleges
              </Button>
            </Link>
            <Link href="/predictor">
              <Button
                size="lg"
                className="bg-white/10 border border-white/30 text-white hover:bg-white/20 font-semibold"
              >
                <Lightbulb size={18} />
                Predict My Colleges
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon size={20} className="text-blue-600" />
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Everything You Need to Decide
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From discovery to decision — our tools guide you through the entire college selection
            journey.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, href, color, cta }) => (
            <div
              key={title}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-4`}
              >
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-1">{desc}</p>
              <Link href={href}>
                <Button variant="outline" size="sm" className="w-full">
                  {cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
