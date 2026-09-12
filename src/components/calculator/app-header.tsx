import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/calculator/progress-bar";
import { LAST_STEP } from "@/lib/calculator";
import { useCalculator } from "@/lib/store";

export function AppHeader() {
  const view = useCalculator((s) => s.view);
  const step = useCalculator((s) => s.step);
  const start = useCalculator((s) => s.start);
  const setStep = useCalculator((s) => s.setStep);
  const reset = useCalculator((s) => s.reset);

  return (
    <header className="sticky top-0 z-30 bg-navy text-snow">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          aria-label="Livora — strona główna"
        >
          <Logo inverted />
        </button>
        {view === "landing" ? (
          <Button type="button" size="sm" onClick={() => start()}>
            Oblicz koszt
          </Button>
        ) : view === "result" ? (
          <p className="text-sm font-medium text-snow/70">Twoja wycena</p>
        ) : (
          <p className="text-sm font-semibold tabular-nums text-snow/80">
            Krok {step + 1} z {LAST_STEP + 1}
          </p>
        )}
      </div>
      {view === "wizard" ? (
        <div className="border-t border-snow/10 bg-navy-mid/60">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <ProgressBar step={step} onJump={setStep} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
