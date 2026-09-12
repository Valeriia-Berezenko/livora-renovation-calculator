import { OptionCard } from "@/components/calculator/option-card";
import { RENOVATIONS } from "@/lib/calculator";
import { formatRange } from "@/lib/utils";
import { useCalculator } from "@/lib/store";

export function TypeStep() {
  const renovationId = useCalculator((s) => s.renovationId);
  const setRenovation = useCalculator((s) => s.setRenovation);

  return (
    <div>
      <header className="max-w-xl">
        <p className="text-sm font-semibold tracking-wide text-blue uppercase">Krok 4</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Jaki rodzaj remontu planujesz?</h2>
        <p className="mt-2 text-muted">Pakiet określa bazowy zakres. Dodatki w kolejnym kroku nie doliczają drugi raz tego, co już jest w pakiecie.</p>
      </header>
      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {RENOVATIONS.map((item) => (
          <OptionCard
            key={item.id}
            selected={renovationId === item.id}
            onSelect={() => setRenovation(item.id)}
            title={item.name}
            description={item.blurb}
            badge={item.id === "standard" ? "Najczęściej" : undefined}
            meta={`${formatRange(item.rateLow, item.rateHigh)} / m²`}
          />
        ))}
      </div>
    </div>
  );
}
