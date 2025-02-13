import { create } from "zustand";

export interface OrderOption {
  name: string;
  optionGroupName: string;
  additionalPrice?: number;
}

export interface OrderItemProps {
  menuId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  ingredient: string[];
  options: OrderOptionItemProps[];
}

export interface OrderOptionItemProps {
  name: string;
  optionGroupName: string;
  additionalPrice?: number;
}

interface Order {
  minOrderPrice: number;
  storeId: number;
  storeName: string;
  deliveryFee: number;
  orders: OrderItemProps[];
}

interface OrderStore {
  order: Order;
  totalPrice: number;
  setOrder: (order: Order) => void;
  increaseQuantity: (menuId: number) => void;
  decreaseQuantity: (menuId: number) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  order: {
    minOrderPrice: 0,
    storeId: 0,
    storeName: "",
    orders: [],
    deliveryFee: 0,
  },
  totalPrice: 0,
  setOrder: (order: Order) => {
    set((state) => ({
      order: order,
      totalPrice: order.orders.reduce(
        (acc, order) =>
          acc +
          (order.price +
            (order.options || []).reduce(
              (acc, option) => acc + (option.additionalPrice || 0),
              0
            )) *
            order.quantity,
        0
      )  + state.order.deliveryFee,
    }));
  },
  increaseQuantity: (menuId: number) => {
    set((state) => {
      const orderItem = state.order.orders.find(
        (order) => order.menuId === menuId
      );
      if (orderItem) {
        orderItem.quantity += 1;
      }
      return {
        order: { ...state.order, orders: [...state.order.orders] },
        totalPrice: state.order.orders.reduce(
          (acc, order) =>
            acc +
            (order.price +
              (order.options || []).reduce(
                (acc, option) => acc + (option.additionalPrice || 0),
                0
              )) *
              order.quantity,
          0
        ) + state.order.deliveryFee,
      };
    });
  },
  decreaseQuantity: (menuId: number) => {
    set((state) => {
      const orderItem = state.order.orders.find(
        (order) => order.menuId === menuId
      );
      if (orderItem && orderItem.quantity > 1) {
        orderItem.quantity -= 1;
      }
      return {
        order: { ...state.order, orders: [...state.order.orders] },
        totalPrice: state.order.orders.reduce(
          (acc, order) =>
            acc +
            (order.price +
              (order.options || []).reduce(
                (acc, option) => acc + (option.additionalPrice || 0),
                0
              )) *
              order.quantity,
          0
        ) + state.order.deliveryFee,
      };
    });
  },
}));

export default useOrderStore;
