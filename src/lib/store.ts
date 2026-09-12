import { create } from "zustand";
import {
  DEFAULT_AREA,
  LAST_STEP,
  type BathId,
  type ExtraId,
  type RenovationId,
  type RoomId,
  type StandardId,
} from "@/lib/calculator";

export type View = "landing" | "wizard" | "result";

type CalculatorState = {
  view: View;
  step: number;
  direction: 1 | -1;
  area: number;
  roomId: RoomId | null;
  bathId: BathId | null;
  renovationId: RenovationId | null;
  standardId: StandardId | null;
  extraIds: ExtraId[];
  start: (renovationId?: RenovationId) => void;
  setStep: (step: number) => void;
  next: () => void;
  back: () => void;
  setArea: (area: number) => void;
  setRoom: (id: RoomId) => void;
  setBath: (id: BathId) => void;
  setRenovation: (id: RenovationId) => void;
  setStandard: (id: StandardId) => void;
  toggleExtra: (id: ExtraId) => void;
  showResult: () => void;
  reset: () => void;
};

const INITIAL = {
  view: "landing" as View,
  step: 0,
  direction: 1 as 1 | -1,
  area: DEFAULT_AREA,
  roomId: null as RoomId | null,
  bathId: null as BathId | null,
  renovationId: null as RenovationId | null,
  standardId: null as StandardId | null,
  extraIds: [] as ExtraId[],
};

export const useCalculator = create<CalculatorState>()((set, get) => ({
  ...INITIAL,
  start: (renovationId) =>
    set({
      ...INITIAL,
      view: "wizard",
      step: 0,
      direction: 1,
      renovationId: renovationId ?? null,
    }),
  setStep: (step) => {
    const current = get().step;
    set({ step, direction: step >= current ? 1 : -1, view: "wizard" });
  },
  next: () => {
    const { step, view } = get();
    if (view !== "wizard") return;
    if (step >= LAST_STEP) {
      set({ view: "result", direction: 1 });
      return;
    }
    set({ step: step + 1, direction: 1 });
  },
  back: () => {
    const { step, view } = get();
    if (view === "result") {
      set({ view: "wizard", step: LAST_STEP, direction: -1 });
      return;
    }
    if (step <= 0) {
      set({ view: "landing", direction: -1 });
      return;
    }
    set({ step: step - 1, direction: -1 });
  },
  setArea: (area) => set({ area }),
  setRoom: (id) => set({ roomId: id }),
  setBath: (id) => set({ bathId: id }),
  setRenovation: (id) => set({ renovationId: id }),
  setStandard: (id) => set({ standardId: id }),
  toggleExtra: (id) =>
    set((state) => ({
      extraIds: state.extraIds.includes(id)
        ? state.extraIds.filter((item) => item !== id)
        : [...state.extraIds, id],
    })),
  showResult: () => set({ view: "result", direction: 1 }),
  reset: () => set({ ...INITIAL }),
}));

export function canAdvance(state: Pick<CalculatorState, "step" | "roomId" | "bathId" | "renovationId" | "standardId">) {
  if (state.step === 1) return Boolean(state.roomId);
  if (state.step === 2) return Boolean(state.bathId);
  if (state.step === 3) return Boolean(state.renovationId);
  if (state.step === 4) return Boolean(state.standardId);
  return true;
}

export function canShowResult(state: Pick<CalculatorState, "roomId" | "bathId" | "renovationId" | "standardId">) {
  return Boolean(state.roomId && state.bathId && state.renovationId && state.standardId);
}
