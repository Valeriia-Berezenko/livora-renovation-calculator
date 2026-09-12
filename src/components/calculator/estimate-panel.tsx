import { Clock3 } from "lucide-react";
import { AnimatedRange } from "@/components/calculator/animated-price";
import { computeEstimate } from "@/lib/calculator";
import { formatArea } from "@/lib/utils";
import { useCalculator } from "@/lib/store";

export function EstimatePanel() {
  const area = useCalculator((s) => s.area);
  const roomId = useCalculator((s) => s.roomId);
  const bathId = useCalculator((s) => s.bathId);
  const renovationId = useCalculator((s) => s.renovationId);
  const standardId = useCalculator((s) => s.standardId);
  const extraIds = useCalculator((s) => s.extraIds);

  const estimate = computeEstimate({ area, roomId, bathId, renovationId, standardId, extraIds });

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 rounded-3xl bg-navy p-6 text-snow shadow-navy">
        <p className="text-xs font-semibold tracking-wide text-snow/50 uppercase">Szacowany koszt</p>
        {estimate ? (
          <>
            <p className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-lime">
              <AnimatedRange low={estimate.totalLow} high={estimate.totalHigh} />
            </p>
            <div className="mt-6 space-y-2.5 border-t border-snow/10 pt-5 text-sm">
              <Meta label="Metraż" value={formatArea(area)} />
              <Meta label="Pokoje" value={estimate.rooms.name} />
              <Meta label="Łazienki" value={estimate.baths.name} />
              <Meta label="Zakres" value={estimate.renovation.name} />
              <Meta label="Standard" value={estimate.standard.name} />
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-snow/60">
              <Clock3 className="size-4" />
              {estimate.weeksMin}–{estimate.weeksMax} tygodni
            </p>
          </>
        ) : (
          <div className="mt-6">
            <p className="font-display text-2xl font-bold tracking-tight">Uzupełnij zakres</p>
            <p className="mt-2 text-sm leading-relaxed text-snow/55">
              Wybierz rodzaj remontu i standard materiałów, żeby zobaczyć przedział ceny.
            </p>
            <p className="mt-4 text-sm font-medium text-snow/80">{formatArea(area)}</p>
          </div>
        )}
      </div>
    </aside>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-snow/50">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
