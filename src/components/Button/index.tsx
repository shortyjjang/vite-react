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
    { children, className, size = "md", variant = "default", ...props },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          "rounded-xl",
          variant === "primary"
            ? "bg-blue-500 text-white"
            : variant === "secondary"
            ? "bg-gray-500 text-white"
            : variant === "danger"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-500",
          size === "lg"
            ? "py-3 px-6 text-lg"
            : size === "sm"
            ? "py-1 px-2 text-sm"
            : "py-2 px-4",
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
