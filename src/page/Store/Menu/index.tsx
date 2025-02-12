import { useState } from "react";
import SummaryCard from "../../../features/Store/Menu/SummaryCard";
import IconArrow from "../../../assets/images/icon-arrow";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMenuItem } from "../../../lib/getMenuItem";
import { MenuItemProps } from "../../../features/Store/StoreItem";

export default function MenuDetail() {
  const [quantity, setQuantity] = useState(1);
  const { pathname } = useLocation();
  const storeId = pathname.split("/")[2];
  const menuId = pathname.split("/")[4];
  const navigate = useNavigate();
  const { data: menu, isLoading } = useQuery<MenuItemProps>({
    queryKey: ["menu", storeId, menuId],
    queryFn: () => getMenuItem(storeId, menuId),
  });
  if (isLoading) return <div>Loading...</div>;
  if(menu?.name) return (
    <div>
      <SummaryCard
        onBack={() => navigate(-1)}
        image={menu.image || "https://placehold.co/600x400"}
        name={menu.name}
        reviewCount={menu.reviewCount}
      />
      <ul>
        <li>
          <label>가격</label>
          <span>{(menu.price || 0).toLocaleString()}원</span>
        </li>
        <li>
          <label>수량</label>
          <div>
            <button onClick={() => setQuantity(quantity - 1)}>
              <IconArrow className="w-4 h-4" />
            </button>
            {quantity}
            <button onClick={() => setQuantity(quantity + 1)}>
              <IconArrow className="w-4 h-4" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
  return <div>Menu not found</div>;
}
