import { useState } from "react";
import { MenuItemProps } from "../../StoreItem";
import SummaryCard from "../SummaryCard";
import IconArrow from "../../../../assets/images/icon-arrow";

export default function MenuDetail({
  menu,
  setIsOpen,
}: {
  menu: MenuItemProps;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <SummaryCard
        onBack={() => setIsOpen(false)}
        image={menu.image || "https://placehold.co/600x400"}
        name={menu.name}
        reviewCount={menu.reviewCount}
      />
      <ul>
        <li>
          <label>가격</label>
          <span>{menu.price.toLocaleString()}원</span>
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
}
