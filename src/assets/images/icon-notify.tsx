import { twMerge } from "tailwind-merge";

export default function IconNotify({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("w-4 h-4", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM13.2529 4.93253L12.9555 14.5599H11.0444L10.7469 4.93253H13.2529ZM10.5216 17.5888C10.5216 16.7595 11.1796 16.1014 12.009 16.1014C12.8112 16.1014 13.4783 16.7595 13.4783 17.5888C13.4783 18.4091 12.8112 19.0671 12.009 19.0671C11.1796 19.0671 10.5216 18.4091 10.5216 17.5888Z"
        fill="currentColor"
      />
    </svg>
  );
}
