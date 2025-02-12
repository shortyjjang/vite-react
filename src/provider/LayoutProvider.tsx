import { useContext, useState } from "react";
import { createContext } from "react";
import Homebar from "../features/Homebar";
import OrderSummary from "../features/OrderSummary";
import useOrderStore from "../store/orderStore";

interface LayoutContextType {
  showHomebar: boolean;
  setShowHomebar: (show: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  showHomebar: false,
  setShowHomebar: () => {},
});

export function useLayout() {
  return useContext(LayoutContext);
}

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showHomebar, setShowHomebar] = useState(false);
  const totalPrice = useOrderStore((state) => state.totalPrice);
  return (
    <LayoutContext.Provider
      value={{
        showHomebar,
        setShowHomebar,
      }}
    >
      {children}
      {(totalPrice > 0 || showHomebar) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white z-10 rounded-t-xl shadow-lg shadow-black">
          {totalPrice > 0 && <OrderSummary />}
          {showHomebar && <Homebar />}
        </div>
      )}
    </LayoutContext.Provider>
  );
}
