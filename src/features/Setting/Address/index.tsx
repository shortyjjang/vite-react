"use client";
import { useEffect } from "react";
import { coordsToAddress } from "../../../lib/getDistance";
import useInfoStore from "../../../store/infoStore";

interface LocationProps {
  onLocationChange: () => void;
}

export default function Location({ onLocationChange }: LocationProps) {
  const { setAddress, setCoords, address } = useInfoStore();

  useEffect(() => {
    coordsToAddress().then((data) => {
      if (typeof data === "string") {
        setAddress(data);
      } else {
        setCoords({
          lat: data.coords.lat || 0,
          lng: data.coords.lng || 0,
        });
        setAddress(data.address);
        setAddress(data.address);
      }
    });
  }, []);

  return (
    <button className="py-2" onClick={onLocationChange}>
      {address || "주소를 찾을 수 없습니다."}
    </button>
  );
}