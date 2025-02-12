import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { stores } from "../../features/Store/stores";
import IconArrow from "../../assets/images/icon-arrow";
import { StoreItemProps } from "../../features/Store/StoreItem";
import useInfoStore from "../../store/infoStore";
import { getDistance } from "../../features/Setting/Address/getDistance";

export default function Store() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const storeId = ((pathname || "").split("/") || []).at(-1);
  const [storeInfo, setStoreInfo] = useState<StoreItemProps | null>(null);
  const { coords } = useInfoStore();
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const store = stores.find((store) => store.id === Number(storeId));
    if (store) {
      setStoreInfo(store);
      getDistance(coords, { lat: store.lat, lng: store.lng }).then((distance) => {
        setDuration(distance.duration);
      });
    }
  }, [storeId]);
  useEffect(() => {
  }, [coords]);
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="py-4 px-2 -mt-4 -ml-4"
      >
        <IconArrow className="w-6 h-6 rotate-180" />
      </button>
      <div className="-mx-4 w-[calc(100vw+2rem)]">
        <img
          src={storeInfo?.image}
          alt={storeInfo?.name}
          className="w-full object-cover aspect-[39/16]"
        />
      </div>
      <h1 className="text-2xl font-semibold pt-4">{storeInfo?.name}</h1>
      <div className="flex items-center gap-1">
        <span>⭐️{storeInfo?.score}</span>
        <span>리뷰{storeInfo?.reviewCount.toLocaleString()} &gt;</span>
      </div>
      <ul>
        <li>
          <label>결제방법</label>
          <span>{storeInfo?.paymentMethod}</span>
        </li>
        <li>
          <label>최소주문</label>
          <span>{(storeInfo?.minOrderAmount || 0).toLocaleString()}원</span>
        </li>
        <li>
          <label>배달시간</label>
          <span>{duration.toLocaleString()}분</span>
        </li>
      </ul>
    </div>
  );
}
