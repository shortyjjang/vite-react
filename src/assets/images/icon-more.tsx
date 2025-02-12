import { twMerge } from "tailwind-merge";

export default function IconMore({ className }: { className?: string }) {
  return (
    <svg
      className={twMerge("w-5 h-1", className)}
      viewBox="0 0 21 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="2.5"
        cy="2.5"
        r="2.5"
        transform="matrix(1 0 0 -1 0 5)"
        fill="currentColor"
      />
      <circle
        cx="2.5"
        cy="2.5"
        r="2.5"
        transform="matrix(1 0 0 -1 8 5)"
        fill="currentColor"
      />
      <circle
        cx="2.5"
        cy="2.5"
        r="2.5"
        transform="matrix(1 0 0 -1 16 5)"
        fill="currentColor"
      />
    </svg>
  );
}
