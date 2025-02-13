import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreItemProps } from "../../features/Store/StoreItem";
import { twMerge } from "tailwind-merge";
import MenuItem from "../../features/Store/Menu/MenuItem";
import { getStoreInfo } from "../../lib/getStoreInfo";
import { useQuery } from "@tanstack/react-query";
import BackHeader from "../../components/BackHeader";
import Title from "../../components/TItle";

export default function Store() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const storeId = ((pathname || "").split("/") || []).at(-1);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const { data: storeInfo, isLoading } = useQuery<StoreItemProps>(
    ["store", storeId],
    async () => (storeId ? await getStoreInfo(storeId) : null)
  );
  if (isLoading) return <div>Loading...</div>;
  if (storeInfo?.name)
    return (
      <div>
        <BackHeader onBack={() => navigate(-1)} />
        <div className="-mx-4 w-screen">
          <img
            src={storeInfo?.image}
            alt={storeInfo?.name}
            className="w-full object-cover aspect-[39/16]"
          />
        </div>
        <Title title={storeInfo?.name} element="h1" className="pt-4" />
        <div className="flex items-center gap-2 pt-1 text-gray-800">
          <span className="font-semibold">⭐️ {storeInfo?.score}</span>
          <span>리뷰{storeInfo?.reviewCount.toLocaleString()} &gt;</span>
        </div>
        <ul className="flex flex-col gap-1 text-sm text-gray-800 pt-3">
          {storeInfo?.paymentMethod && (
            <li className="grid grid-cols-[60px_auto] gap-x-2">
              <label>결제방법</label>
              <span>{storeInfo?.paymentMethod}</span>
            </li>
          )}
          {(storeInfo?.minOrderAmount || 0) > 0 && (
            <li className="grid grid-cols-[60px_auto] gap-x-2">
              <label>최소주문</label>
              <span>{(storeInfo?.minOrderAmount || 0).toLocaleString()}원</span>
            </li>
          )}
          <li className="grid grid-cols-[60px_auto] gap-x-2">
            <label>배달시간</label>
            <span>{storeInfo?.duration}</span>
          </li>
        </ul>
        <ul className="whitespace-nowrap overflow-x-auto px-2 -mx-2 w-screen shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.1)] pt-6">
          {(storeInfo?.categories || []).map((category, index) => (
            <li
              key={category.name}
              className={twMerge(
                "inline-block align-top cursor-pointer px-2 py-2",
                index === selectedCategoryIndex
                  ? "text-gray-800 font-semibold shadow-[inset_0_-2px_0_0_rgba(0,0,0,1)]"
                  : "text-gray-500"
              )}
              onClick={() => setSelectedCategoryIndex(index)}
            >
              {category.name}
            </li>
          ))}
        </ul>
        {(storeInfo?.categories || []).length > 0 && (
          <div>
            <Title
              title={storeInfo?.categories?.[selectedCategoryIndex]?.name || ""}
              element="h3"
            />
            <ul>
              {(
                storeInfo?.categories?.[selectedCategoryIndex]?.menus || []
              ).map((menu) => (
                <MenuItem
                  key={menu.name}
                  menu={menu}
                  storeName={storeInfo?.name || ""}
                  storeId={Number(storeInfo.id)}
                  minOrderAmount={storeInfo?.minOrderAmount || 0}
                  deliveryFee={storeInfo?.deliveryFee || 0}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
}
