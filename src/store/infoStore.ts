// src/store/useInfoStore.ts
import { create } from "zustand";

interface InfoStore {
  address: string;
  coords: { lat: number; lng: number };
  setAddress: (address: string) => void;
  setCoords: (coords: { lat: number; lng: number }) => void; // setCoords 추가
}

const useInfoStore = create<InfoStore>((set) => ({
  address: "서울특별시 사 강남구 테헤란로 142 아크플레이스",
  coords: { lat: 37.4945891, lng: 126.868328 },
  setAddress: (address) => set({ address }),
  setCoords: (coords) => set({ coords }), // setCoords 구현
}));

export default useInfoStore;