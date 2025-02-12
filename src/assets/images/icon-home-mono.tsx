import { twMerge } from "tailwind-merge";

export default function IconHomeMono({ className }: { className?: string }) {
  return (
    <svg
      className={twMerge("w-6 h-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.069 8.20407L12.622 1.48707C12.4453 1.34623 12.226 1.26953 12 1.26953C11.774 1.26953 11.5547 1.34623 11.378 1.48707L2.92999 8.20407C2.69454 8.39135 2.50437 8.62933 2.37365 8.90029C2.24293 9.17126 2.17502 9.46822 2.17499 9.76907V19.1871C2.17499 19.8236 2.42784 20.434 2.87793 20.8841C3.32802 21.3342 3.93847 21.5871 4.57499 21.5871H9.99999V16.8351C9.99999 16.5699 10.1053 16.3155 10.2929 16.128C10.4804 15.9404 10.7348 15.8351 11 15.8351H13C13.2652 15.8351 13.5196 15.9404 13.7071 16.128C13.8946 16.3155 14 16.5699 14 16.8351V21.5871H19.424C20.0605 21.5871 20.671 21.3342 21.121 20.8841C21.5711 20.434 21.824 19.8236 21.824 19.1871V9.77007C21.824 9.46922 21.756 9.17226 21.6253 8.90129C21.4946 8.63033 21.3044 8.39235 21.069 8.20507"
        fill="currentColor"
      />
    </svg>
  );
}
