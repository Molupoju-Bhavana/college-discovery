import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatLPA(lpa: number): string {
  return `${lpa} LPA`;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-");
}
