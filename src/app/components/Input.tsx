"use client";

import { cn } from "@/utilities/cn";
import React, { ComponentProps, forwardRef, useId } from "react";

type Variant = "default" | "error" | "success" | "warning";
type Size = "sm" | "md" | "lg";

interface IInput extends Omit<ComponentProps<"input">, "size"> {
  variant?: Variant;
  size?: Size;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      className,
      variant = "default",
      size = "md",
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      loading = false,
      required = false,
      id,

      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id || autoId;

    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
    };

    const variantClasses = {
      default:
        "border-gray-300 focus:ring-[#adb5bd] focus:border-[#adb5bd] text-gray-800 dark:text-white/60",
      error:
        "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 bg-red-50",
      success:
        "border-green-500 focus:ring-green-500 focus:border-green-500 text-green-900 bg-green-50",
      warning:
        "border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-yellow-900 bg-yellow-50",
    };

    const iconColorClasses = {
      default: "text-gray-400 peer-focus:text-[#adb5bd]",
      error: "text-red-500",
      success: "text-green-500",
      warning: "text-yellow-500",
    };

    const hasLeftIcon = LeftIcon && !loading;
    const hasRightIcon = RightIcon || loading;
    const currentVariant = error ? "error" : variant;

    return (
      <div className="flex w-full flex-col">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-1 text-sm font-medium",
              currentVariant === "error"
                ? "text-red-700"
                : "text-gray-700 dark:text-white/60",
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "peer w-full rounded-xl border font-medium transition-all duration-500 ease-in-out focus:ring-1 focus:ring-offset-1 focus:outline-0",
              sizeClasses[size],
              variantClasses[currentVariant],
              hasLeftIcon && "pl-10",
              hasRightIcon && "pr-10",
              loading && "cursor-not-allowed",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            aria-required={required}
            disabled={loading || rest.disabled}
            {...rest}
          />

          {/* Left Icon */}
          {hasLeftIcon && (
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-3",
                iconColorClasses[currentVariant],
              )}
            >
              <LeftIcon className="h-4 w-4" />
            </div>
          )}

          {/* Right Icon or Loading */}
          {hasRightIcon && (
            <div
              className={cn(
                "absolute inset-y-0 right-0 flex items-center justify-center px-3",
                iconColorClasses[currentVariant],
              )}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gray-400" />
              ) : (
                RightIcon
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <span
            id={`${inputId}-error`}
            className="mt-1 text-xs font-medium text-red-600"
          >
            {error}
          </span>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <span
            id={`${inputId}-helper`}
            className="mt-1 text-xs text-gray-500 dark:text-white/60"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
