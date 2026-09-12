import { OptionCard } from "@/components/calculator/option-card";
import { EXTRAS, getRenovation } from "@/lib/calculator";
import { formatRange } from "@/lib/utils";
import { useCalculator } from "@/lib/store";

export function ExtrasStep() {
  const extraIds = useCalculator((s) => s.extraIds);
  const toggleExtra = useCalculator((s) => s.toggleExtra);
  const renovationId = useCalculator((s) => s.renovationId);
  const renovation = getRenovation(renovationId);

  return (
    <div>
      <header className="max-w-xl">
        <p className="text-sm font-semibold tracking-wide text-blue uppercase">Krok 6</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Jakie prace dodatkowe?</h2>
        <p className="mt-2 text-muted">
          Możesz zaznaczyć kilka. Jeśli pakiet już obejmuje daną pracę, doliczamy tylko rozszerzony zakres — bez podwójnego liczenia.
        </p>
      </header>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {EXTRAS.map((extra) => {
          const overlap = renovation ? extra.overlap[renovation.id] : 1;
          const suggested = renovation?.suggested.includes(extra.id);
          return (
            <OptionCard
              key={extra.id}
              compact
              selected={extraIds.includes(extra.id)}
              onSelect={() => toggleExtra(extra.id)}
              icon={extra.icon}
              title={extra.name}
              description={extra.blurb}
              badge={suggested ? "Polecane" : overlap < 1 ? "Częściowo w pakiecie" : undefined}
              meta={overlap < 1 ? `Zakres dodatkowy · ${Math.round(overlap * 100)}%` : formatRange(extra.low, extra.high)}
            />
          );
        })}
      </div>
    </div>
  );
}
