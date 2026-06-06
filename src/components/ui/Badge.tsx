import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "orange" | "red" | "gray" | "purple";
  className?: string;
}

export function Badge({ children, variant = "gray", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full",
        {
          "bg-blue-100 text-blue-700": variant === "blue",
          "bg-green-100 text-green-700": variant === "green",
          "bg-orange-100 text-orange-700": variant === "orange",
          "bg-red-100 text-red-700": variant === "red",
          "bg-gray-100 text-gray-600": variant === "gray",
          "bg-purple-100 text-purple-700": variant === "purple",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
