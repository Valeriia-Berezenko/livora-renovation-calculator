import type { LucideIcon } from "lucide-react";
import {
  Bath,
  Blend,
  ChefHat,
  DoorClosed,
  Droplets,
  Grid3x3,
  Hammer,
  Layers,
  Paintbrush,
  SquareStack,
  Trash2,
  Zap,
} from "lucide-react";

export type RoomId = "1" | "2" | "3" | "4" | "5plus";
export type BathId = "1" | "2" | "3plus";
export type RenovationId = "refresh" | "standard" | "full";
export type StandardId = "economy" | "standard" | "premium";
export type ExtraId =
  | "electrical"
  | "plumbing"
  | "kitchen"
  | "bathroom"
  | "ceiling"
  | "demolition"
  | "newWalls"
  | "doors"
  | "flooring"
  | "painting"
  | "plaster"
  | "debris";

export type RoomOption = { id: RoomId; name: string; count: number };
export type BathOption = { id: BathId; name: string; count: number };

export type Renovation = {
  id: RenovationId;
  name: string;
  blurb: string;
  rateLow: number;
  rateHigh: number;
  weeksMin: number;
  weeksMax: number;
  suggested: ExtraId[];
};

export type MaterialStandard = {
  id: StandardId;
  name: string;
  blurb: string;
  multiplier: number;
};

export type Extra = {
  id: ExtraId;
  name: string;
  blurb: string;
  icon: LucideIcon;
  kind: "flat" | "perM2" | "perDoor" | "perBath";
  low: number;
  high: number;
  overlap: Record<RenovationId, number>;
  materialHeavy: boolean;
};

export const MIN_AREA = 20;
export const MAX_AREA = 200;
export const DEFAULT_AREA = 65;

export const ROOMS: RoomOption[] = [
  { id: "1", name: "1 pokój", count: 1 },
  { id: "2", name: "2 pokoje", count: 2 },
  { id: "3", name: "3 pokoje", count: 3 },
  { id: "4", name: "4 pokoje", count: 4 },
  { id: "5plus", name: "5+ pokoi", count: 5 },
];

export const BATHS: BathOption[] = [
  { id: "1", name: "1 łazienka", count: 1 },
  { id: "2", name: "2 łazienki", count: 2 },
  { id: "3plus", name: "3+ łazienki", count: 3 },
];

export const RENOVATIONS: Renovation[] = [
  {
    id: "refresh",
    name: "Odświeżenie",
    blurb: "Malowanie, drobne naprawy, wymiana wybranych elementów.",
    rateLow: 800,
    rateHigh: 1100,
    weeksMin: 2,
    weeksMax: 4,
    suggested: ["painting", "plaster", "debris"],
  },
  {
    id: "standard",
    name: "Remont standardowy",
    blurb: "Podłogi, ściany, łazienka, częściowa elektryka i montaż wyposażenia.",
    rateLow: 1400,
    rateHigh: 2000,
    weeksMin: 4,
    weeksMax: 8,
    suggested: ["electrical", "kitchen", "doors", "debris"],
  },
  {
    id: "full",
    name: "Remont generalny",
    blurb: "Kompleksowy remont, instalacje, ściany, podłogi, łazienka i kuchnia.",
    rateLow: 2200,
    rateHigh: 3200,
    weeksMin: 6,
    weeksMax: 12,
    suggested: ["ceiling", "demolition", "newWalls", "doors"],
  },
];

export const STANDARDS: MaterialStandard[] = [
  {
    id: "economy",
    name: "Ekonomiczny",
    blurb: "Sprawdzone materiały w dobrej cenie. Czysty, trwały efekt bez zbędnych dodatków.",
    multiplier: 0.9,
  },
  {
    id: "standard",
    name: "Standard",
    blurb: "Najczęściej wybierany. Lepsze wykończenia i sprzęt, który dobrze znosi codzienne użycie.",
    multiplier: 1,
  },
  {
    id: "premium",
    name: "Premium",
    blurb: "Materiały z wyższej półki, staranniejsze detale i wykończenie pod klucz.",
    multiplier: 1.3,
  },
];

export const EXTRAS: Extra[] = [
  {
    id: "electrical",
    name: "Wymiana instalacji elektrycznej",
    blurb: "Nowa instalacja, punkty i rozdzielnica.",
    icon: Zap,
    kind: "flat",
    low: 8000,
    high: 15000,
    overlap: { refresh: 1, standard: 0.55, full: 0.3 },
    materialHeavy: false,
  },
  {
    id: "plumbing",
    name: "Wymiana instalacji hydraulicznej",
    blurb: "Piony, podejścia i nowa armatura.",
    icon: Droplets,
    kind: "flat",
    low: 6000,
    high: 12000,
    overlap: { refresh: 1, standard: 0.7, full: 0.3 },
    materialHeavy: false,
  },
  {
    id: "kitchen",
    name: "Remont kuchni",
    blurb: "Rozszerzony zakres kuchni poza pakietem.",
    icon: ChefHat,
    kind: "flat",
    low: 12000,
    high: 25000,
    overlap: { refresh: 1, standard: 1, full: 0.35 },
    materialHeavy: true,
  },
  {
    id: "bathroom",
    name: "Remont łazienki",
    blurb: "Glazura, hydroizolacja i wyposażenie. Mnożone przez liczbę łazienek.",
    icon: Bath,
    kind: "perBath",
    low: 10000,
    high: 20000,
    overlap: { refresh: 1, standard: 0.4, full: 0.35 },
    materialHeavy: true,
  },
  {
    id: "ceiling",
    name: "Sufity podwieszane",
    blurb: "Konstrukcja, płyty i malowanie sufitu.",
    icon: Layers,
    kind: "perM2",
    low: 150,
    high: 250,
    overlap: { refresh: 1, standard: 1, full: 0.85 },
    materialHeavy: true,
  },
  {
    id: "demolition",
    name: "Wyburzanie ścian",
    blurb: "Rozebranie ścian działowych i uprzątnięcie.",
    icon: Hammer,
    kind: "flat",
    low: 2000,
    high: 5000,
    overlap: { refresh: 1, standard: 0.9, full: 0.85 },
    materialHeavy: false,
  },
  {
    id: "newWalls",
    name: "Budowa nowych ścian działowych",
    blurb: "Nowe ściany, tynk i przygotowanie pod malowanie.",
    icon: SquareStack,
    kind: "flat",
    low: 2500,
    high: 6000,
    overlap: { refresh: 1, standard: 1, full: 0.9 },
    materialHeavy: true,
  },
  {
    id: "doors",
    name: "Wymiana drzwi",
    blurb: "Skrzydła i ościeżnice. Liczba drzwi z liczby pokoi.",
    icon: DoorClosed,
    kind: "perDoor",
    low: 1200,
    high: 2500,
    overlap: { refresh: 1, standard: 0.7, full: 0.5 },
    materialHeavy: true,
  },
  {
    id: "flooring",
    name: "Montaż podłogi",
    blurb: "Przygotowanie podłoża i ułożenie nowej posadzki.",
    icon: Grid3x3,
    kind: "perM2",
    low: 120,
    high: 250,
    overlap: { refresh: 0.9, standard: 0.25, full: 0.2 },
    materialHeavy: true,
  },
  {
    id: "painting",
    name: "Malowanie",
    blurb: "Dodatkowe warstwy lub zakres poza pakietem.",
    icon: Paintbrush,
    kind: "perM2",
    low: 35,
    high: 60,
    overlap: { refresh: 0.3, standard: 0.25, full: 0.2 },
    materialHeavy: true,
  },
  {
    id: "plaster",
    name: "Gładzie",
    blurb: "Wyrównanie ścian pod farbę.",
    icon: Blend,
    kind: "perM2",
    low: 45,
    high: 80,
    overlap: { refresh: 0.7, standard: 0.3, full: 0.25 },
    materialHeavy: true,
  },
  {
    id: "debris",
    name: "Wywóz gruzu",
    blurb: "Kontener, załadunek i utylizacja odpadów.",
    icon: Trash2,
    kind: "flat",
    low: 1500,
    high: 3500,
    overlap: { refresh: 0.85, standard: 0.5, full: 0.3 },
    materialHeavy: false,
  },
];

export const STEPS = [
  { id: 0, label: "Metraż" },
  { id: 1, label: "Pokoje" },
  { id: 2, label: "Łazienki" },
  { id: 3, label: "Zakres" },
  { id: 4, label: "Standard" },
  { id: 5, label: "Dodatki" },
] as const;

export const LAST_STEP = 5;
export const LABOR_SHARE = 0.48;
export const MATERIAL_SHARE = 0.52;

export function getRoom(id: RoomId | null) {
  return ROOMS.find((item) => item.id === id);
}

export function getBath(id: BathId | null) {
  return BATHS.find((item) => item.id === id);
}

export function getRenovation(id: RenovationId | null) {
  return RENOVATIONS.find((item) => item.id === id);
}

export function getStandard(id: StandardId | null) {
  return STANDARDS.find((item) => item.id === id);
}

export function doorCount(rooms: number, baths: number) {
  return rooms + 1 + Math.max(0, baths - 1);
}

export type ExtraLine = { id: ExtraId; label: string; low: number; high: number };

export type Estimate = {
  ready: boolean;
  laborLow: number;
  laborHigh: number;
  materialsLow: number;
  materialsHigh: number;
  extras: ExtraLine[];
  extrasLow: number;
  extrasHigh: number;
  totalLow: number;
  totalHigh: number;
  weeksMin: number;
  weeksMax: number;
  rateLow: number;
  rateHigh: number;
  area: number;
  rooms: RoomOption;
  baths: BathOption;
  renovation: Renovation;
  standard: MaterialStandard;
};

export type EstimateInput = {
  area: number;
  roomId: RoomId | null;
  bathId: BathId | null;
  renovationId: RenovationId | null;
  standardId: StandardId | null;
  extraIds: ExtraId[];
};

function extraQuantity(extra: Extra, input: EstimateInput, rooms: number, baths: number) {
  if (extra.kind === "perM2") return input.area;
  if (extra.kind === "perDoor") return doorCount(rooms, baths);
  if (extra.kind === "perBath") return baths;
  const t = (input.area - MIN_AREA) / (MAX_AREA - MIN_AREA);
  return 0.85 + t * 0.15;
}

function extraRange(extra: Extra, input: EstimateInput, renovation: Renovation, standard: MaterialStandard, rooms: number, baths: number) {
  const overlap = extra.overlap[renovation.id];
  const mat = extra.materialHeavy ? standard.multiplier : 1;
  const qty = extraQuantity(extra, input, rooms, baths);
  return {
    low: Math.round(extra.low * qty * overlap * mat),
    high: Math.round(extra.high * qty * overlap * mat),
  };
}

function bathroomFactor(baths: number, renovation: RenovationId) {
  if (renovation === "refresh") return 1 + (baths - 1) * 0.04;
  if (renovation === "standard") return 1 + (baths - 1) * 0.1;
  return 1 + (baths - 1) * 0.12;
}

function roomFactor(rooms: number) {
  if (rooms <= 1) return 0.97;
  if (rooms === 2) return 1;
  if (rooms === 3) return 1.03;
  if (rooms === 4) return 1.06;
  return 1.1;
}

export function computeEstimate(input: EstimateInput): Estimate | null {
  const renovation = getRenovation(input.renovationId);
  const standard = getStandard(input.standardId);
  const rooms = getRoom(input.roomId);
  const baths = getBath(input.bathId);
  if (!renovation || !standard) return null;

  const roomCount = rooms?.count ?? 2;
  const bathCount = baths?.count ?? 1;
  const scale = bathroomFactor(bathCount, renovation.id) * roomFactor(roomCount);
  const baseLow = input.area * renovation.rateLow * scale;
  const baseHigh = input.area * renovation.rateHigh * scale;

  const laborLow = Math.round(baseLow * LABOR_SHARE);
  const laborHigh = Math.round(baseHigh * LABOR_SHARE);
  const materialsLow = Math.round(baseLow * MATERIAL_SHARE * standard.multiplier);
  const materialsHigh = Math.round(baseHigh * MATERIAL_SHARE * standard.multiplier);

  const extras: ExtraLine[] = input.extraIds
    .map((id) => EXTRAS.find((item) => item.id === id))
    .filter((item): item is Extra => Boolean(item))
    .map((extra) => {
      const range = extraRange(extra, input, renovation, standard, roomCount, bathCount);
      return { id: extra.id, label: extra.name, low: range.low, high: range.high };
    });

  const extrasLow = extras.reduce((sum, line) => sum + line.low, 0);
  const extrasHigh = extras.reduce((sum, line) => sum + line.high, 0);
  const totalLow = laborLow + materialsLow + extrasLow;
  const totalHigh = laborHigh + materialsHigh + extrasHigh;

  let weeksMin = renovation.weeksMin;
  let weeksMax = renovation.weeksMax;
  if (input.area > 70) {
    weeksMin += 1;
    weeksMax += 1;
  }
  if (input.area > 100) {
    weeksMin += 1;
    weeksMax += 2;
  }
  if (input.area > 140) {
    weeksMin += 1;
    weeksMax += 2;
  }
  if (roomCount >= 4) {
    weeksMin += 1;
    weeksMax += 1;
  }
  if (roomCount >= 5) weeksMax += 1;
  if (bathCount >= 2) {
    weeksMin += 1;
    weeksMax += 1;
  }
  if (bathCount >= 3) weeksMax += 1;

  const heavy = new Set<ExtraId>(["electrical", "plumbing", "kitchen", "bathroom", "demolition", "newWalls"]);
  const extraWeeks = input.extraIds.reduce((sum, id) => sum + (heavy.has(id) ? 0.7 : 0.25), 0);
  weeksMin += Math.round(extraWeeks * 0.5);
  weeksMax += Math.round(extraWeeks);
  if (standard.id === "premium") {
    weeksMin += 1;
    weeksMax += 1;
  }
  if (renovation.id === "full" && input.area >= 120) weeksMax = Math.max(weeksMax, 14);
  weeksMin = Math.max(2, weeksMin);
  weeksMax = Math.max(weeksMin + 1, weeksMax);

  return {
    ready: Boolean(input.renovationId && input.standardId && input.roomId && input.bathId),
    laborLow,
    laborHigh,
    materialsLow,
    materialsHigh,
    extras,
    extrasLow,
    extrasHigh,
    totalLow,
    totalHigh,
    weeksMin,
    weeksMax,
    rateLow: Math.round(renovation.rateLow * standard.multiplier),
    rateHigh: Math.round(renovation.rateHigh * standard.multiplier),
    area: input.area,
    rooms: rooms ?? ROOMS[1]!,
    baths: baths ?? BATHS[0]!,
    renovation,
    standard,
  };
}

export function estimateSummary(est: Estimate): string {
  const extraLines = est.extras
    .map((line) => `• ${line.label}: ${formatPlain(line.low)} – ${formatPlain(line.high)}`)
    .join("\n");
  return [
    `Livora — szacunek kosztu remontu mieszkania`,
    `${est.area} m² · ${est.rooms.name} · ${est.baths.name}`,
    `${est.renovation.name} · standard ${est.standard.name}`,
    ``,
    `Szacowany koszt: ${formatPlain(est.totalLow)} – ${formatPlain(est.totalHigh)}`,
    `Szacowany czas: ${est.weeksMin}–${est.weeksMax} tygodni`,
    ``,
    `Podział`,
    `• Robocizna: ${formatPlain(est.laborLow)} – ${formatPlain(est.laborHigh)}`,
    `• Materiały: ${formatPlain(est.materialsLow)} – ${formatPlain(est.materialsHigh)}`,
    `• Prace dodatkowe: ${formatPlain(est.extrasLow)} – ${formatPlain(est.extrasHigh)}`,
    extraLines,
    ``,
    `Podana wycena ma charakter orientacyjny. Dokładna cena zależy od stanu mieszkania i rzeczywistego zakresu prac.`,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatPlain(value: number): string {
  return `${new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(Math.round(value))} zł`;
}
