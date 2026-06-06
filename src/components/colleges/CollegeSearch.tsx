"use client";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface CollegeSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export function CollegeSearch({ value, onChange }: CollegeSearchProps) {
  return (
    <div className="relative">
      <Input
        placeholder="Search colleges by name, city, or state..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leftIcon={<Search size={16} />}
        className="pr-10 h-11 text-base"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
