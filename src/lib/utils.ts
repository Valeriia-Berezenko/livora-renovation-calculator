import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatZloty(value: number): string {
  return `${new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(Math.round(value))} zł`;
}

export function formatRange(low: number, high: number): string {
  return `${formatZloty(low)} – ${formatZloty(high)}`;
}

export function formatArea(value: number): string {
  return `${value} m²`;
}
