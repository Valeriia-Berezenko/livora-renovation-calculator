import { STEPS } from "@/lib/calculator";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  step: number;
  onJump: (step: number) => void;
};

export function ProgressBar({ step, onJump }: ProgressBarProps) {
  return (
    <ol className="flex w-full items-center gap-1 sm:gap-2" aria-label="Kroki kalkulatora">
      {STEPS.map((item, index) => {
        const active = index === step;
        const done = index < step;
        return (
          <li key={item.id} className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => onJump(index)}
              aria-label={`Przejdź do kroku: ${item.label}`}
              className={cn(
                "flex min-h-11 w-full items-center gap-2 rounded-full px-1 text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue",
              )}
              aria-current={active ? "step" : undefined}
            >
              <span
                className={cn(
                  "hidden size-2.5 shrink-0 rounded-full sm:block",
                  active && "bg-blue",
                  done && "bg-lime",
                  !active && !done && "bg-line-strong",
                )}
              />
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block h-1.5 rounded-full",
                    active && "bg-blue",
                    done && "bg-lime",
                    !active && !done && "bg-line",
                  )}
                />
                <span
                  className={cn(
                    "mt-2 hidden truncate text-xs font-semibold sm:block",
                    active ? "text-blue" : done ? "text-snow" : "text-snow/40",
                  )}
                >
                  {item.label}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
