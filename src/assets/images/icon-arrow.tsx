import { twMerge } from "tailwind-merge";

export default function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      className={twMerge("w-4 h-4", className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.55 13.65C5.75 13.65 5.95 13.5833 6.08333 13.3833L11.0833 8.38333C11.4167 8.05 11.4167 7.58333 11.0833 7.25L6.08333 2.25C5.75 1.91667 5.28333 1.91667 4.95 2.25C4.61667 2.58333 4.61667 3.05 4.95 3.38333L9.48333 7.85L5.01667 12.3167C4.68333 12.65 4.68333 13.1167 5.01667 13.45C5.15 13.5833 5.35 13.65 5.55 13.65Z"
        fill="currentColor"
      />
    </svg>
  );
}
