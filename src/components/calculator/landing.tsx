import { ArrowRight, ClipboardList, Clock3, Ruler } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { RENOVATIONS } from "@/lib/calculator";
import { formatRange } from "@/lib/utils";
import { useCalculator } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Landing() {
  const start = useCalculator((s) => s.start);

  return (
    <div className="overflow-x-clip">
      <section className="relative overflow-x-clip bg-navy text-snow">
        <div className="pointer-events-none relative z-0 h-[6.75rem] overflow-hidden min-[360px]:h-[9.5rem] sm:h-[13rem] lg:absolute lg:inset-0 lg:h-full">
          <img
            src="/hero-renovation.jpg"
            alt="Nowoczesne mieszkanie w trakcie remontu — drabina, farby i częściowo ułożona podłoga"
            width={1792}
            height={1008}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[58%_52%] sm:object-[64%_46%] lg:object-[78%_42%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-navy/25 lg:hidden" />
          <div className="pointer-events-none absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,rgb(8_27_51/0.96)_0%,rgb(8_27_51/0.88)_28%,rgb(8_27_51/0.45)_52%,rgb(8_27_51/0.22)_72%,rgb(8_27_51/0.28)_100%)]" />
          <div className="pointer-events-none absolute inset-0 hidden lg:block bg-[linear-gradient(180deg,rgb(8_27_51/0.35)_0%,transparent_22%,transparent_78%,rgb(8_27_51/0.45)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-6xl gap-4 px-4 py-4 sm:gap-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start lg:gap-x-10 lg:gap-y-0 lg:py-20">
          <div className="relative z-10 min-w-0 lg:col-start-1 lg:row-start-1">
            <p className="rise-in inline-flex max-w-full items-center gap-2 rounded-full bg-snow/8 px-3 py-1 text-[0.68rem] font-semibold tracking-wide text-snow/80 uppercase sm:text-xs">
              <span className="size-1.5 shrink-0 rounded-full bg-blue" />
              <span className="min-w-0 truncate">Kalkulator kosztu remontu</span>
            </p>
            <h1 className="rise-in-delay-1 mt-3 font-display text-[1.55rem] font-extrabold leading-[1.12] tracking-tight text-balance sm:mt-5 sm:text-[2.35rem] lg:text-5xl">
              Policz koszt remontu mieszkania.
            </h1>
            <p className="rise-in-delay-2 mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-snow/72 sm:mt-5 sm:line-clamp-none sm:text-base lg:text-lg">
              Orientacyjna wycena i czas realizacji dla mieszkań w Polsce. Metraż, zakres prac i standard materiałów — bez telefonu od handlowca.
            </p>
            <div className="relative z-10 mt-4 sm:mt-8">
              <Button
                type="button"
                size="lg"
                className="relative z-10 h-12 w-full px-6 text-sm sm:h-14 sm:w-auto sm:px-7 sm:text-base"
                onClick={() => start()}
              >
                Oblicz koszt
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <aside className="rise-in-delay-2 relative min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="rounded-2xl bg-navy-mid/85 p-2 shadow-navy ring-1 ring-snow/12 backdrop-blur-md sm:rounded-3xl sm:p-3">
              <div className="rounded-xl bg-navy/88 p-3.5 sm:rounded-2xl sm:p-6 lg:p-7">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <LogoMark inverted className="size-6 shrink-0 sm:size-7" />
                    <span className="truncate text-sm font-semibold text-snow/70">Przykład: 65 m²</span>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue/20 px-2.5 py-1 text-[0.7rem] font-semibold text-blue sm:text-xs">
                    Odświeżenie
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium text-snow/55 sm:mt-6 sm:text-sm">Szacowany koszt remontu</p>
                <p className="mt-1 font-display text-[clamp(1.15rem,5vw,1.75rem)] font-bold tracking-[-0.04em] whitespace-nowrap text-lime">
                  48&nbsp;000&nbsp;–&nbsp;57&nbsp;000&nbsp;zł
                </p>
                <p className="mt-2 text-xs text-snow/55 sm:text-sm">Szacowany czas realizacji · 2–4 tygodnie</p>
                <div className="mt-3 space-y-2 border-t border-snow/10 pt-3 text-sm sm:mt-6 sm:space-y-3 sm:pt-5">
                  <Row label="Robocizna" value="23 000 – 27 000 zł" />
                  <Row label="Materiały" value="21 000 – 26 000 zł" />
                  <Row label="Prace dodatkowe" value="4 000 zł" accent />
                </div>
              </div>
            </div>
          </aside>

          <dl className="grid grid-cols-3 gap-2 border-t border-snow/10 pt-4 sm:gap-4 sm:pt-6 lg:col-start-1 lg:row-start-2 lg:mt-10">
            <Stat value="< 2 min" label="Do wyceny" />
            <Stat value="6 kroków" label="Prosty proces" />
            <Stat value="PL" label="Stawki rynkowe" />
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-blue uppercase">Rodzaj remontu</p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-ink">
              Od czego zaczynamy?
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Wybierz pakiet albo przejdź od razu do kalkulatora. Metraż i dodatki ustawisz w kolejnych krokach.
          </p>
        </div>
        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {RENOVATIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => start(item.id)}
              className={cn(
                "flex min-h-28 flex-col rounded-2xl bg-card p-5 text-left shadow-card",
                "transition-[box-shadow,transform] duration-200 ease-out",
                "hover:shadow-selected hover:-translate-y-0.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
              )}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-display text-lg font-bold tracking-tight">{item.name}</span>
                <ArrowRight className="size-4 text-muted" />
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{item.blurb}</span>
              <span className="mt-4 text-sm font-semibold text-navy">{formatRange(item.rateLow, item.rateHigh)} / m²</span>
            </button>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="font-display text-3xl font-bold tracking-tight">Jak działa wycena?</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <How
              icon={Ruler}
              title="1. Podajesz podstawowe dane."
              body="Metraż, liczba pokoi i łazienek. To ustala skalę mieszkania i czas prac."
            />
            <How
              icon={ClipboardList}
              title="2. Wybierasz zakres prac."
              body="Rodzaj remontu, standard materiałów i opcjonalne prace dodatkowe."
            />
            <How
              icon={Clock3}
              title="3. Otrzymujesz orientacyjny koszt i czas realizacji."
              body="Przedział w złotych, podział na robociznę i materiały oraz szacowany harmonogram."
            />
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
            Podana wycena ma charakter orientacyjny. Dokładna cena zależy od stanu mieszkania i rzeczywistego zakresu prac.
          </p>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0">
      <dt className="font-display text-base font-bold tracking-tight sm:text-lg lg:text-xl">{value}</dt>
      <dd className="mt-0.5 text-[0.7rem] leading-snug text-snow/55 sm:text-xs lg:text-sm">{label}</dd>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3">
      <span className="min-w-0 truncate text-snow/60">{label}</span>
      <span className={cn("shrink-0 text-right text-xs font-semibold tabular-nums sm:text-sm", accent ? "text-lime" : "text-snow")}>
        {value}
      </span>
    </div>
  );
}

function How({ icon: Icon, title, body }: { icon: typeof Ruler; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-soft text-blue">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <div>
        <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}
