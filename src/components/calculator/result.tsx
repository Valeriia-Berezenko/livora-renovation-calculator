import { useState } from "react";
import { Clock3, RotateCcw } from "lucide-react";
import { AnimatedRange } from "@/components/calculator/animated-price";
import { QuoteDialog } from "@/components/calculator/quote-dialog";
import { Button } from "@/components/ui/button";
import { computeEstimate } from "@/lib/calculator";
import { formatArea, formatRange } from "@/lib/utils";
import { useCalculator } from "@/lib/store";

export function Result() {
  const area = useCalculator((s) => s.area);
  const roomId = useCalculator((s) => s.roomId);
  const bathId = useCalculator((s) => s.bathId);
  const renovationId = useCalculator((s) => s.renovationId);
  const standardId = useCalculator((s) => s.standardId);
  const extraIds = useCalculator((s) => s.extraIds);
  const reset = useCalculator((s) => s.reset);
  const back = useCalculator((s) => s.back);
  const setStep = useCalculator((s) => s.setStep);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const estimate = computeEstimate({ area, roomId, bathId, renovationId, standardId, extraIds });

  if (!estimate) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h2 className="font-display text-3xl font-bold">Dokończ kalkulator</h2>
        <p className="mt-2 text-muted">Potrzebujemy zakresu remontu i standardu materiałów, żeby podać wycenę.</p>
        <Button className="mt-6" onClick={() => setStep(0)}>
          Zmień dane
        </Button>
      </div>
    );
  }

  const lines = [
    { id: "labor", label: "Robocizna", low: estimate.laborLow, high: estimate.laborHigh },
    { id: "materials", label: "Materiały", low: estimate.materialsLow, high: estimate.materialsHigh },
    { id: "extras", label: "Prace dodatkowe", low: estimate.extrasLow, high: estimate.extrasHigh },
  ];
  const maxLine = Math.max(...lines.map((line) => line.high), 1);
  const extraNames = estimate.extras.map((line) => line.label);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="rise-in relative overflow-hidden rounded-3xl bg-navy p-6 text-snow shadow-navy sm:p-10">
        <div className="result-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-blue/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 size-48 rounded-full bg-blue/15 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-semibold tracking-wide text-snow/60 uppercase">Twoja wycena Livora</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {estimate.renovation.name}
          </h2>
          <p className="mt-2 text-sm text-snow/60 sm:text-base">
            {formatArea(estimate.area)} · {estimate.rooms.name} · {estimate.baths.name} · {estimate.standard.name}
          </p>

          <p className="mt-10 text-sm font-medium text-snow/55">Szacowany koszt remontu</p>
          <p className="font-display text-4xl font-extrabold leading-tight tracking-tight text-lime sm:text-5xl">
            <AnimatedRange low={estimate.totalLow} high={estimate.totalHigh} />
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-snow/8 px-4 text-sm font-medium">
              <Clock3 className="size-4 text-blue" />
              Szacowany czas realizacji {estimate.weeksMin}–{estimate.weeksMax} tygodni
            </span>
          </div>
        </div>
      </div>

      <div className="rise-in-delay-1 mt-6 rounded-3xl bg-card p-6 shadow-card sm:p-8">
        <h3 className="font-display text-xl font-bold tracking-tight">Podział kosztów</h3>
        <ul className="mt-6 space-y-4">
          {lines.map((line) => (
            <li key={line.id}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-muted">{line.label}</span>
                <span className="text-right font-semibold tabular-nums text-ink">{formatRange(line.low, line.high)}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper">
                <div
                  className={line.id === "extras" ? "h-full rounded-full bg-lime" : "h-full rounded-full bg-blue"}
                  style={{ width: `${Math.max(6, (line.high / maxLine) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
        {estimate.extras.length > 0 ? (
          <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            {estimate.extras.map((line) => (
              <li key={line.id} className="flex justify-between gap-3 text-muted">
                <span>{line.label}</span>
                <span className="tabular-nums">{formatRange(line.low, line.high)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="rise-in-delay-2 mt-6 rounded-3xl bg-card p-6 shadow-card sm:p-8">
        <h3 className="font-display text-xl font-bold tracking-tight">Twoje dane</h3>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <Summary label="Powierzchnia" value={formatArea(estimate.area)} />
          <Summary label="Liczba pokoi" value={estimate.rooms.name} />
          <Summary label="Łazienki" value={estimate.baths.name} />
          <Summary label="Rodzaj remontu" value={estimate.renovation.name} />
          <Summary label="Standard materiałów" value={estimate.standard.name} />
          <Summary
            label="Prace dodatkowe"
            value={extraNames.length ? extraNames.join(", ") : "Brak"}
          />
        </dl>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Podana wycena ma charakter orientacyjny. Dokładna cena zależy od stanu mieszkania i rzeczywistego zakresu prac.
        </p>
      </div>

      <div className="no-print mt-6 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={() => setQuoteOpen(true)} className="sm:flex-1">
          Poproś o dokładną wycenę
        </Button>
        <Button size="lg" variant="outline" onClick={back} className="sm:flex-1">
          Zmień dane
        </Button>
        <Button size="lg" variant="navy" onClick={reset} className="sm:flex-1">
          <RotateCcw className="size-4" />
          Nowa wycena
        </Button>
      </div>

      <QuoteDialog open={quoteOpen} onClose={() => setQuoteOpen(false)} estimate={estimate} />
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper px-4 py-3">
      <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}
