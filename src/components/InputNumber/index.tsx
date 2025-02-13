import { twMerge } from "tailwind-merge";
import IconArrow from "../../assets/images/icon-arrow";

export default function InputNumber({
  value,
  increase,
  decrease,
  unit = "",
  size = "md",
}: {
  value: number;
  increase: () => void;
  decrease: () => void;
  unit?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={twMerge(
        "-mr-2 flex items-center",
        size === "sm" && "text-sm",
        size === "md" && "text-md font-semibold",
        size === "lg" && "text-lg"
      )}
    >
      {value > 1 && (
        <button onClick={decrease} className="px-2 py-4">
          <IconArrow className="w-4 h-4 rotate-180" />
        </button>
      )}
      {value}
      {unit}
      <button onClick={increase} className="px-2 py-4">
        <IconArrow className="w-4 h-4" />
      </button>
    </div>
  );
}
