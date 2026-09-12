import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/calculator/app-header";
import { Landing } from "@/components/calculator/landing";
import { Result } from "@/components/calculator/result";
import { Wizard } from "@/components/calculator/wizard";
import { useCalculator } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const view = useCalculator((s) => s.view);
  const step = useCalculator((s) => s.step);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view, step]);

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <AppHeader />
      <main className="flex-1">
        {view === "landing" ? <Landing /> : null}
        {view === "wizard" ? <Wizard /> : null}
        {view === "result" ? <Result /> : null}
      </main>
      {view !== "wizard" ? (
        <footer className="border-t border-navy-mid bg-navy px-4 py-8 text-snow">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-sm font-bold tracking-tight">Livora</p>
            <p className="text-xs text-snow/50">
              Orientacyjna wycena remontu mieszkania na polskim rynku. To nie jest oferta handlowa.
            </p>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
