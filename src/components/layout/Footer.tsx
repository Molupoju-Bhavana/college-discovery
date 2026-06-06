import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                <GraduationCap size={15} className="text-white" />
              </div>
              <span className="text-white font-bold">CollegeFinder</span>
            </div>
            <p className="text-sm">Your smart guide to college decisions in India.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
            <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
            <Link href="/predictor" className="hover:text-white transition-colors">Predictor</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-xs text-center">
          © {new Date().getFullYear()} CollegeFinder. Built with Next.js, React, TypeScript &amp; TailwindCSS.
        </div>
      </div>
    </footer>
  );
}
