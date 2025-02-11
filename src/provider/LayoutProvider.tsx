import { useState } from "react";
import { createContext } from "react";
import Homebar from "../features/Homebar";
import OrderSummary from "../features/OrderSummary";

interface LayoutContextType {
  showHomebar: boolean;
  setShowHomebar: (show: boolean) => void;
  showOrderSummary: boolean;
  setShowOrderSummary: (show: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  showHomebar: false,
  setShowHomebar: () => {},
  showOrderSummary: false,
  setShowOrderSummary: () => {},
});

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showHomebar, setShowHomebar] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  return (
    <LayoutContext.Provider
      value={{
        showHomebar,
        setShowHomebar,
        showOrderSummary,
        setShowOrderSummary,
      }}
    >
      {children}
      {(showOrderSummary || showHomebar) && (
        <div className="fixed bottom-0 left-0 right-0">
          {showOrderSummary && <OrderSummary />}
          {showHomebar && <Homebar />}
        </div>
      )}
    </LayoutContext.Provider>
  );
}
