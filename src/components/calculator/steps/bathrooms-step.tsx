import { Bath } from "lucide-react";
import { OptionCard } from "@/components/calculator/option-card";
import { BATHS } from "@/lib/calculator";
import { useCalculator } from "@/lib/store";

export function BathroomsStep() {
  const bathId = useCalculator((s) => s.bathId);
  const setBath = useCalculator((s) => s.setBath);

  return (
    <div>
      <header className="max-w-xl">
        <p className="text-sm font-semibold tracking-wide text-blue uppercase">Krok 3</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Ile łazienek remontujesz?</h2>
        <p className="mt-2 text-muted">Każda dodatkowa łazienka podnosi koszt glazury, hydroizolacji i instalacji.</p>
      </header>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {BATHS.map((bath) => (
          <OptionCard
            key={bath.id}
            selected={bathId === bath.id}
            onSelect={() => setBath(bath.id)}
            icon={Bath}
            title={bath.name}
          />
        ))}
      </div>
    </div>
  );
}
