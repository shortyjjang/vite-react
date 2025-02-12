import { twMerge } from "tailwind-merge";

export default function CategoryItem({
  label,
  icon,
  onClick,
  className = "",
}: {
  label: string;
  icon: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={twMerge("flex items-center rounded flex-col gap-2 bg-gray-100 text-gray-800 p-4 font-semibold", className)}
    >
      <img src={icon} alt={label} className="w-8 h-8" />
      <span>{label}</span>
    </div>
  );
}
