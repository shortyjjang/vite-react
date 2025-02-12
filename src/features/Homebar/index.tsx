
import { useLocation, useNavigate } from "react-router-dom";
import { menus } from "./menus";
import { twMerge } from "tailwind-merge";

export default function Homebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex items-center justify-around bg-white border-t border-gray-200 rounded-t-xl">
      {menus.map(({ label, path, icon:Icon }) => (
        <button
          key={label}
          onClick={() => navigate(path)}
          className={twMerge('flex flex-col gap-1 items-center p-2 text-xs', pathname === path ? "text-black" : "text-gray-500")}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}


