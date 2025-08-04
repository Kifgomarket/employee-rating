"use client";

import { cn } from "@/utilities/cn";
import { Loader } from "lucide-react";
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, loading = false, disabled, ...props }, ref) => {
    return (
      <div className={cn("w-full")}>
        <div className="w-full">
          <button
            ref={ref}
            type="submit"
            tabIndex={0}
            data-react-aria-pressable="true"
            disabled={disabled || loading}
            aria-busy={loading}
            aria-live="polite"
            className={cn(
              "relative flex w-full items-center justify-center overflow-hidden rounded-xl px-5 py-3 text-sm font-medium ring-[#e85d04] ring-offset-2 ring-offset-inherit outline-none select-none",
              "bg-[#e85d04] text-white transition-colors duration-300 ease-in-out hover:bg-[#dc2f02] dark:bg-[#d00000]",
              "focus:outline-none data-[focus-visible]:ring-2",
              "cursor-pointer",
              "disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-600",
              "data-[pressed]:bg-[#d00000]",
              "btn-primary",
              className,
            )}
            {...props}
          >
            {/* Top Shine Border */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
              <div className="size-full rounded-xl border-t-2 border-white/20" />
            </span>

            {/* Border All Except Top */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
              <div className="size-full rounded-xl border border-t-0 border-white/10" />
            </span>

            {/* Content */}
            <span className="relative flex items-center px-2.5">
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <span>{children}</span>
                  <Loader className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <span style={{ transform: "none" }}>{children}</span>
              )}
            </span>
          </button>
        </div>
      </div>
    );
  },
);

Button.displayName = "Button";

export default Button;
