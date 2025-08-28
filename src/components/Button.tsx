import { cn } from "@/utilities/cn";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Spinner from "./Spinner";

export const buttonVariants = cva(
  "group relative cursor-pointer text-shadow-white/30 text-shadow-xs rounded-[var(--rounded)] text-sm font-medium transition-all duration-300 [--rounded:var(--radius-xl)] disabled:text-[var(--color-btn-text-disabled)] disabled:bg-[var(--color-btn-disabled)] disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-600",
        dark: "bg-gray-950 text-white hover:bg-gray-900",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-100",
        ghost: "bg-transparent text-gray-800",
        danger: "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-gray-300 hover:border-gray-400 bg-transparent text-gray-800 hover:bg-white/10",
        link: "underline-offset-4 text-white hover:underline bg-transparent",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
      noise: {
        true: "",
        false: "",
      },
      border: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Noise only applies to certain variants
      {
        variant: ["primary", "secondary", "outline", "danger"],
        noise: true,
        className: "",
      },
      {
        variant: ["primary", "outline", "secondary"],
        border: true,
        className: "",
      },
      {
        variant: ["link"],
        border: false,
        noise: false,
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      noise: true,
      border: true,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

const NoiseBackground = () => (
  <div className="group absolute inset-0 z-10 overflow-hidden rounded-[var(--rounded)] mask-b-from-0 opacity-30">
    <svg
      className="absolute inset-0 z-10"
      viewBox="0 0 250 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.5"
          numOctaves="5"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const ButtonBorder = () => (
  <div className="group absolute inset-0 p-[var(--padding)] [--padding:0.1rem]">
    <div
      className={cn(
        "relative z-20 size-full rounded-[calc(var(--rounded)-var(--padding))] border-[0.08rem] border-white/15 bg-gradient-to-b from-white/10 to-white/5 shadow-xs",
        "before:absolute before:-inset-[0.08rem] before:rounded-[calc(var(--rounded)-var(--padding))] before:border-t-[0.08rem] before:border-white/40 before:bg-transparent before:mask-l-from-0",
      )}
    />
  </div>
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      noise = true,
      border = true,
      className,
      children,
      isLoading = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, noise, border, className }),
          "group relative p-3 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none",
        )}
        disabled={isLoading}
        {...props}
      >
        {noise && <NoiseBackground />}
        {border && <ButtonBorder />}
        {!isLoading ? (
          children
        ) : (
          <Spinner className="size-4 text-[var(--color-btn-text-disabled)] dark:text-[var(--color-btn-text-disabled)]" />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
