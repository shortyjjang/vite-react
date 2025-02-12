import { useEffect, useState } from "react";
import useInfoStore from "../../../store/infoStore";
import { getDistance } from "../../../lib/getDistance";
import { useNavigate } from "react-router-dom";

export default function StoreItem({
  name,
  ranking,
  image,
  lng,
  lat,
  score,
  reviewCount,
  id,
}: StoreItemProps) {
  const { coords } = useInfoStore();
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getDistance(coords, { lat: lat, lng: lng }).then((distance) => {
      setDeliveryFee(distance.deliveryFee);
      setDuration(distance.duration);
    });
  }, [coords]);
  return (
    <div
      className="grid grid-cols-[54px_auto] gap-x-4"
      onClick={() => navigate(`/store/${id}`)}
    >
      <div className="row-span-3">
        <img
          src={image}
          alt={name}
          className="object-cover w-full aspect-square rounded-md leading-5"
        />
      </div>
      <h3 className="flex flex-col font-semibold">
        {ranking < 4 && <span>{ranking}위</span>}
        {name}
      </h3>
      <p className="text-sm text-gray-500 pt-[2px]">
        ★{score} ({reviewCount.toLocaleString()})
      </p>
      <p className="text-sm text-gray-500">
        {duration.toLocaleString()}분 ∙ 배달비 {deliveryFee.toLocaleString()}원
      </p>
    </div>
  );
}

export interface StoreItemProps {
  id: number;
  name: string;
  ranking: number;
  image: string;
  address: string;
  lng: number;
  lat: number;
  phone: string;
  time: string;
  score: number;
  reviewCount: number;
  paymentMethod?: string;
  minOrderAmount?: number;
  categories?: CategoryItemProps[];
  duration?: number;
  deliveryFee?: number;
  distance?: number;
}

export interface CategoryItemProps {
  name: string;
  menus: MenuItemProps[];
}

export interface MenuItemProps {
  name: string;
  price: number;
  isBest?: boolean;
  description?: string;
  reviewCount?: number;
  optionGroups?: OptionGroupProps[];
  ingredient?: string[];
  image?: string;
}

export interface OptionGroupProps {
  name: string;
  options: OptionProps[];
  minSelectableCount?: number;
  maxSelectableCount?: number;
}

export interface OptionProps {
  name: string;
  additionalPrice: number;
}