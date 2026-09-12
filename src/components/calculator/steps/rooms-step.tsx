import { OptionCard } from "@/components/calculator/option-card";
import { ROOMS } from "@/lib/calculator";
import { useCalculator } from "@/lib/store";

export function RoomsStep() {
  const roomId = useCalculator((s) => s.roomId);
  const setRoom = useCalculator((s) => s.setRoom);
  const next = useCalculator((s) => s.next);

  return (
    <div>
      <header className="max-w-xl">
        <p className="text-sm font-semibold tracking-wide text-blue uppercase">Krok 2</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Ile pokoi ma mieszkanie?</h2>
        <p className="mt-2 text-muted">Liczba pokoi wpływa na czas prac i zakres wymiany drzwi.</p>
      </header>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ROOMS.map((room) => (
          <OptionCard
            key={room.id}
            selected={roomId === room.id}
            onSelect={() => {
              setRoom(room.id);
              window.setTimeout(() => next(), 180);
            }}
            title={room.name}
            description={room.id === "5plus" ? "Duże mieszkanie, więcej stolarki i wykończeń." : undefined}
          />
        ))}
      </div>
    </div>
  );
}
