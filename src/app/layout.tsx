import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CompareBar } from "@/components/colleges/CompareBar";

export const metadata: Metadata = {
  title: "CollegeFinder — Discover Your Best College",
  description: "Search, compare, and predict admissions for top colleges in India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CompareBar />
        <Footer />
      </body>
    </html>
  );
}
