// src/store/useInfoStore.ts
import { create } from "zustand";

interface InfoStore {
  address: string;
  coords: { lat: number; lng: number };
  setAddress: (address: string) => void;
  setCoords: (coords: { lat: number; lng: number }) => void; // setCoords 추가
}

const useInfoStore = create<InfoStore>((set) => ({
  address: "",
  coords: { lat: 0, lng: 0 },
  setAddress: (address) => set({ address }),
  setCoords: (coords) => set({ coords }), // setCoords 구현
}));

export default useInfoStore;