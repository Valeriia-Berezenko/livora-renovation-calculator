import { ArrowLeft, ArrowRight } from "lucide-react";
import { EstimatePanel } from "@/components/calculator/estimate-panel";
import { AreaStep } from "@/components/calculator/steps/area-step";
import { BathroomsStep } from "@/components/calculator/steps/bathrooms-step";
import { ExtrasStep } from "@/components/calculator/steps/extras-step";
import { RoomsStep } from "@/components/calculator/steps/rooms-step";
import { StandardStep } from "@/components/calculator/steps/standard-step";
import { TypeStep } from "@/components/calculator/steps/type-step";
import { Button } from "@/components/ui/button";
import { AnimatedRange } from "@/components/calculator/animated-price";
import { LAST_STEP, computeEstimate } from "@/lib/calculator";
import { canAdvance, useCalculator } from "@/lib/store";

const STEP_VIEWS = [AreaStep, RoomsStep, BathroomsStep, TypeStep, StandardStep, ExtrasStep];

export function Wizard() {
  const step = useCalculator((s) => s.step);
  const direction = useCalculator((s) => s.direction);
  const area = useCalculator((s) => s.area);
  const roomId = useCalculator((s) => s.roomId);
  const bathId = useCalculator((s) => s.bathId);
  const renovationId = useCalculator((s) => s.renovationId);
  const standardId = useCalculator((s) => s.standardId);
  const extraIds = useCalculator((s) => s.extraIds);
  const next = useCalculator((s) => s.next);
  const back = useCalculator((s) => s.back);
  const showResult = useCalculator((s) => s.showResult);

  const Step = STEP_VIEWS[step] ?? AreaStep;
  const ready = canAdvance({ step, roomId, bathId, renovationId, standardId });
  const estimate = computeEstimate({ area, roomId, bathId, renovationId, standardId, extraIds });
  const last = step === LAST_STEP;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div
          key={`${step}-${direction}`}
          className={direction === -1 ? "step-enter-back" : "step-enter-forward"}
        >
          <Step />
          {!last ? (
            <div className="mt-8 hidden items-center justify-between gap-3 lg:flex">
              <Button type="button" variant="outline" onClick={back}>
                <ArrowLeft className="size-4" />
                Wstecz
              </Button>
              <Button type="button" onClick={next} disabled={!ready}>
                Dalej
                <ArrowRight className="size-4" />
              </Button>
            </div>
          ) : null}
        </div>
        <EstimatePanel />
      </div>

      {last ? (
        <>
          <div className="h-28" />
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm">
            <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center gap-3">
              <Button type="button" variant="outline" onClick={back} className="shrink-0">
                <ArrowLeft className="size-4" />
                Wstecz
              </Button>
              <Button type="button" onClick={showResult} className="min-w-0 flex-1 sm:flex-none">
                Oblicz koszt
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-24 lg:hidden" />
          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card/95 p-3 backdrop-blur-sm lg:hidden">
            <div className="mx-auto flex max-w-6xl items-center gap-3">
              <Button variant="outline" size="sm" onClick={back} className="shrink-0 px-4">
                <ArrowLeft className="size-4" />
                <span className="sr-only">Wstecz</span>
              </Button>
              <div className="min-w-0 flex-1">
                {estimate ? (
                  <p className="truncate text-sm font-bold tabular-nums text-navy">
                    <AnimatedRange low={estimate.totalLow} high={estimate.totalHigh} className="text-navy" />
                  </p>
                ) : (
                  <p className="truncate text-xs font-medium text-muted">Wybierz zakres, by wycenić</p>
                )}
              </div>
              <Button type="button" size="sm" onClick={next} disabled={!ready} className="shrink-0">
                Dalej
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
