import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-blue text-snow shadow-selected hover:bg-blue-deep",
        navy: "bg-navy text-snow hover:bg-navy-mid",
        snow: "bg-snow text-navy hover:bg-blue-soft",
        outline: "bg-transparent text-ink ring-1 ring-line-strong hover:ring-blue hover:text-blue",
        ghost: "bg-transparent text-ink hover:bg-blue-soft hover:text-navy",
        inverse: "bg-transparent text-snow ring-1 ring-snow/30 hover:bg-snow/10",
      },
      size: {
        sm: "h-11 px-4 text-sm",
        md: "h-12 px-5 text-sm",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
