import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type OptionCardProps = {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  meta?: string;
  icon?: LucideIcon;
  badge?: string;
  compact?: boolean;
};

export function OptionCard({
  selected,
  onSelect,
  title,
  description,
  meta,
  icon: Icon,
  badge,
  compact,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "relative flex w-full rounded-2xl bg-card text-left shadow-card",
        "transition-[box-shadow,background-color,transform] duration-200 ease-out",
        "hover:shadow-card-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
        selected && "bg-blue-soft shadow-selected",
        compact ? "min-h-24 items-center gap-3 p-4" : "min-h-36 flex-col gap-4 p-5 sm:p-6",
      )}
    >
      {Icon ? (
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            "transition-colors duration-200",
            selected ? "bg-blue text-snow" : "bg-paper text-navy",
          )}
        >
          <Icon className="size-5" strokeWidth={1.8} />
        </span>
      ) : null}

      <span className={cn("min-w-0", compact ? "flex-1" : "mt-auto")}>
        <span className="flex flex-wrap items-center gap-2 pr-8">
          <span className="font-display text-lg font-bold tracking-tight text-ink">{title}</span>
          {badge ? (
            <span className="rounded-full bg-navy px-2 py-0.5 text-xs font-semibold text-snow">
              {badge}
            </span>
          ) : null}
        </span>
        {description ? (
          <span className="mt-1.5 block text-sm leading-relaxed text-muted">{description}</span>
        ) : null}
        {meta ? (
          <span
            className={cn(
              "block font-semibold tabular-nums",
              selected ? "text-blue" : "text-navy",
              compact ? "mt-1 text-sm" : "mt-3 text-sm",
            )}
          >
            {meta}
          </span>
        ) : null}
      </span>

      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full",
          "transition-[background-color,transform] duration-200",
          selected ? "bg-lime text-lime-ink" : "bg-paper text-transparent",
          compact ? "" : "absolute top-5 right-5",
        )}
        aria-hidden="true"
      >
        <Check className="size-3.5" strokeWidth={3} />
      </span>
    </button>
  );
}
