import { create } from "zustand";

interface OrderStore {
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  totalPrice: 0,
  setTotalPrice: (price: number) => {
    set({ totalPrice: price });
  },
}));

export default useOrderStore;
