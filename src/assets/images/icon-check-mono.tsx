import { twMerge } from "tailwind-merge";

export default function IconCheckMono({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("w-4 h-4", className)}
    >
      <path
        d="M10.6 17.2001C10.3 17.2001 9.99995 17.1001 9.79995 16.8001L5.19995 12.2001C4.69995 11.7001 4.69995 11.0001 5.19995 10.5001C5.69995 10.0001 6.39995 10.0001 6.89995 10.5001L10.6 14.2001L17.2 7.6001C17.7 7.1001 18.4 7.1001 18.9 7.6001C19.4 8.1001 19.4 8.8001 18.9 9.3001L11.5 16.7001C11.2 17.1001 10.9 17.2001 10.6 17.2001Z"
        fill="currentColor"
      />
    </svg>
  );
}
