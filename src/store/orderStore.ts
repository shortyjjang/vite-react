import { create } from "zustand";

export interface OrderOption {
  name: string;
  optionGroupName: string;
  additionalPrice?: number;
}

export interface OrderItem {
  menuId: number;
  name: string;
  price: number;
  quantity: number;
  options: {
    name: string;
    optionGroupName: string;
    additionalPrice?: number;
  }[];
}

interface Order {
  minOrderPrice: number;
  storeId: number;
  orders: OrderItem[];
}

interface OrderStore {
  order: Order;
  setOrder: (order: Order) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  order: {
    minOrderPrice: 0,
    storeId: 0,
    orders: [],
  },
  setOrder: (order: Order) => {
    set({ order });
  },
  totalPrice: 0,
  setTotalPrice: (price: number) => {
    set({ totalPrice: price });
  },
}));

export default useOrderStore;
