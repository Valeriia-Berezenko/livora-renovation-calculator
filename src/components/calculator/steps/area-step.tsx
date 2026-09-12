import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { DEFAULT_AREA, MAX_AREA, MIN_AREA } from "@/lib/calculator";
import { formatArea } from "@/lib/utils";
import { useCalculator } from "@/lib/store";

export function AreaStep() {
  const area = useCalculator((s) => s.area);
  const setArea = useCalculator((s) => s.setArea);
  const [draft, setDraft] = useState(String(area));
  const ratio = (area - MIN_AREA) / (MAX_AREA - MIN_AREA);

  useEffect(() => {
    setDraft(String(area));
  }, [area]);

  const commitDraft = () => {
    const parsed = Number(draft.replace(",", "."));
    if (!Number.isFinite(parsed)) {
      setDraft(String(area));
      return;
    }
    const next = Math.min(MAX_AREA, Math.max(MIN_AREA, Math.round(parsed)));
    setArea(next);
    setDraft(String(next));
  };

  return (
    <div>
      <header className="max-w-xl">
        <p className="text-sm font-semibold tracking-wide text-blue uppercase">Krok 1</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Jaka jest powierzchnia mieszkania?</h2>
        <p className="mt-2 text-muted">
          Ustaw metraż suwakiem albo wpisz wartość. Zakres: {formatArea(MIN_AREA)} – {formatArea(MAX_AREA)}.
        </p>
      </header>

      <div className="mt-10 rounded-3xl bg-card p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <label className="block">
            <span className="text-xs font-semibold tracking-wide text-muted uppercase">Powierzchnia</span>
            <span className="mt-2 flex items-center gap-2">
              <input
                type="number"
                min={MIN_AREA}
                max={MAX_AREA}
                inputMode="numeric"
                value={draft}
                onChange={(event) => {
                  const value = event.target.value;
                  setDraft(value);
                  const parsed = Number(value.replace(",", "."));
                  if (Number.isFinite(parsed) && parsed >= MIN_AREA && parsed <= MAX_AREA) {
                    setArea(Math.round(parsed));
                  }
                }}
                onBlur={commitDraft}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.currentTarget.blur();
                  }
                }}
                className="h-14 w-28 rounded-xl bg-paper px-3 font-display text-3xl font-extrabold tabular-nums text-navy outline-none ring-1 ring-line focus:ring-2 focus:ring-blue"
                aria-label="Powierzchnia mieszkania w metrach kwadratowych"
              />
              <span className="font-display text-2xl font-bold text-muted">m²</span>
            </span>
          </label>
          <p className="text-sm font-medium text-muted">np. {formatArea(DEFAULT_AREA)}</p>
        </div>
        <div className="mt-8">
          <Slider
            value={area}
            min={MIN_AREA}
            max={MAX_AREA}
            onValueChange={setArea}
            ariaLabel="Powierzchnia mieszkania w metrach kwadratowych"
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-muted">
            <span>{formatArea(MIN_AREA)}</span>
            <span>{formatArea(MAX_AREA)}</span>
          </div>
        </div>

        <div className="mt-10 flex min-h-40 items-end justify-center rounded-2xl bg-paper p-6">
          <div
            className="relative flex items-center justify-center rounded-lg bg-blue-soft shadow-[inset_0_0_0_2px_var(--color-blue)] transition-[width,height] duration-300 ease-out"
            style={{
              width: `${36 + ratio * 52}%`,
              height: `${96 + ratio * 88}px`,
            }}
          >
            <span className="font-display text-sm font-bold tracking-tight text-navy">
              {formatArea(area)}
            </span>
            <span className="absolute -top-px -left-px size-2 rounded-full bg-blue" />
            <span className="absolute -top-px -right-px size-2 rounded-full bg-blue" />
            <span className="absolute -bottom-px -left-px size-2 rounded-full bg-blue" />
            <span className="absolute -bottom-px -right-px size-2 rounded-full bg-blue" />
          </div>
        </div>
      </div>
    </div>
  );
}
