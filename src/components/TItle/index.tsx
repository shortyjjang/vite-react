import React from "react";
import { twMerge } from "tailwind-merge";

export default function Title({
  title,
  description,
  element = "h1",
  className = "",
  rightComponent,
}: {
  title: string;
  description?: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  rightComponent?: React.ReactNode;
}) {
  return (
    <div>
      {React.createElement(
        element,
        {
          className: twMerge(
            "flex items-center gap-2 justify-between",
            element === "h1"
              ? "text-2xl font-semibold"
              : element === "h2"
              ? "text-xl font-bold"
              : element === "h3"
              ? "text-lg font-semibold py-4 text-gray-500"
              : element === "h4"
              ? "text-base font-bold"
              : element === "h5"
              ? "text-sm font-bold"
              : "text-xs font-bold",
            className
          ),
        },
        title,
        <span className="text-gray-500 text-base font-normal">{rightComponent}</span>
      )}
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
}
