import { MenuItemProps } from "../../StoreItem";
import Button from "../../../../components/Button";
import { useNavigate } from "react-router-dom";

export default function MenuItem({ menu, storeId }: { menu: MenuItemProps, storeId:number }) {
  const navigate = useNavigate();
  return (
    <li className="grid grid-cols-[54px_auto_100px] gap-x-4 gap-y-1">
      <div className="row-span-3 flex items-center">
        <img
          src={menu.image || "https://placehold.co/400x400"}
          alt={menu.name}
          className="w-full object-cover aspect-square rounded-md"
        />
      </div>
      <h4 className="font-medium">
        {menu.name}{" "}
        {menu.isBest && <b className="font-medium text-blue-500">BEST</b>}
      </h4>
      <div className="row-span-3 flex justify-end items-center">
        <Button onClick={() => navigate(`/store/${storeId}/menu/${menu.id}`)}>담기</Button>
      </div>
      <p className="text-sm text-gray-500">{menu.price.toLocaleString()}원</p>
      <p className="text-sm text-gray-500">
        {(menu.ingredient || []).join(", ")}
      </p>
    </li>
  );
}
