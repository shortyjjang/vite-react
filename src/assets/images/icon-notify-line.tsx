import { twMerge } from "tailwind-merge";

export default function IconNotifyLine({ className }: { className?: string }) {
  return (
    <svg
      className={twMerge("w-4 h-4", className)}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.01758 9.88672L9.17871 4.67188H7.82129L7.98242 9.88672H9.01758ZM8.50488 10.7217C8.05566 10.7217 7.69922 11.0781 7.69922 11.5273C7.69922 11.9717 8.05566 12.3281 8.50488 12.3281C8.93945 12.3281 9.30078 11.9717 9.30078 11.5273C9.30078 11.0781 8.93945 10.7217 8.50488 10.7217Z"
        fill="currentColor"
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="7.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
