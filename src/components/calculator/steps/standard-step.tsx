import { OptionCard } from "@/components/calculator/option-card";
import { STANDARDS } from "@/lib/calculator";
import { useCalculator } from "@/lib/store";

export function StandardStep() {
  const standardId = useCalculator((s) => s.standardId);
  const setStandard = useCalculator((s) => s.setStandard);
  const next = useCalculator((s) => s.next);

  return (
    <div>
      <header className="max-w-xl">
        <p className="text-sm font-semibold tracking-wide text-blue uppercase">Krok 5</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Jaki standard materiałów?</h2>
        <p className="mt-2 text-muted">Mnożnik dotyczy głównie materiałów wykończeniowych, nie samej robocizny.</p>
      </header>
      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {STANDARDS.map((item) => (
          <OptionCard
            key={item.id}
            selected={standardId === item.id}
            onSelect={() => {
              setStandard(item.id);
              window.setTimeout(() => next(), 180);
            }}
            title={item.name}
            description={item.blurb}
            badge={item.id === "standard" ? "Polecany" : undefined}
            meta={
              item.multiplier === 1
                ? "Cena bazowa"
                : item.multiplier < 1
                  ? "−10% do materiałów"
                  : "+30% do materiałów"
            }
          />
        ))}
      </div>
    </div>
  );
}
