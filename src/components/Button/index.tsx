import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger" | "default";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, size = "md", variant = "primary", ...props },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "primary"
            ? "bg-blue-500 text-white"
            : variant === "secondary"
            ? "bg-gray-200 text-gray-500"
            : variant === "danger"
            ? "bg-red-500 text-white"
            : "text-blue-500 font-semibold",
          size === "lg"
            ? "rounded-xl py-3 px-6 text-lg"
            : size === "sm"
            ? "rounded-lg py-2 px-3 text-xs"
            : "rounded-lg py-2 px-4 text-sm",
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
