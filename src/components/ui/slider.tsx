import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

type SliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: number) => void;
  ariaLabel: string;
};

export function Slider({ value, min, max, step = 1, onValueChange, ariaLabel }: SliderProps) {
  return (
    <SliderPrimitive.Root
      className="relative flex h-11 w-full touch-none items-center select-none"
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(values) => onValueChange(values[0] ?? min)}
      aria-label={ariaLabel}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-line">
        <SliderPrimitive.Range className="absolute h-full bg-blue" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          "block size-7 rounded-full bg-snow shadow-selected",
          "transition-transform duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
          "active:scale-95",
        )}
      />
    </SliderPrimitive.Root>
  );
}
