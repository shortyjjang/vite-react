import React from "react";
import IconArrow from "../../assets/images/icon-arrow";
import { twMerge } from "tailwind-merge";

export default function BackHeader({
  rightComponent,
  onBack,
  isTransparent = false,
}: {
  rightComponent?: React.ReactNode;
  onBack?: () => void;
  isTransparent?: boolean;
}) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between sticky top-0 -mt-4 p-4 w-screen -ml-4 left-0 right-0 z-10",
        isTransparent ? "bg-transparent" : "bg-white"
      )}
    >
      <button className="flex items-center justify-center" onClick={onBack}>
        <IconArrow className="w-6 h-6 rotate-180" />
      </button>
      {rightComponent}
    </div>
  );
}
