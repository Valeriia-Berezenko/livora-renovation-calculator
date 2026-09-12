import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

export function LogoMark({ className, inverted }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        className={inverted ? "fill-snow" : "fill-navy"}
      />
      <path
        d="M8 22V10h4.2v8.4H22V22H8Z"
        className={inverted ? "fill-navy" : "fill-snow"}
      />
      <rect
        x="19.2"
        y="8.6"
        width="4.6"
        height="4.6"
        rx="1"
        className="fill-lime"
      />
    </svg>
  );
}

export function Logo({ className, inverted }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark inverted={inverted} />
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight",
          inverted ? "text-snow" : "text-navy",
        )}
      >
        Livora
      </span>
    </span>
  );
}
