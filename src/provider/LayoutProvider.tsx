import { useContext, useState } from "react";
import { createContext } from "react";
import Homebar from "../features/Homebar";
import OrderSummary from "../features/OrderSummary";
import useOrderStore from "../store/orderStore";
import Alert, { AlertProps } from "../components/Alert";
import Toast from "../components/Toast";

interface LayoutAlertProps extends AlertProps {
  status?: "alert" | "toast";
}

interface LayoutContextType {
  showHomebar: boolean;
  setShowHomebar: (show: boolean) => void;
  alert: LayoutAlertProps | null;
  setAlert: (alert: LayoutAlertProps | null) => void;
  showOrderSummary: boolean;
  setShowOrderSummary: (show: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  showHomebar: false,
  setShowHomebar: () => {},
  alert: null,
  setAlert: () => {},
  showOrderSummary: false,
  setShowOrderSummary: () => {},
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
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const { order } = useOrderStore();
  const totalPrice = order.orders.reduce(
    (acc, curr) =>
      acc +
      (curr.price +
        (curr.options || []).reduce((acc, curr) => acc + (curr.additionalPrice || 0), 0) *
          (curr.quantity || 0)),
    0
  );
  const [alert, setAlert] = useState<LayoutAlertProps | null>(null);
  return (
    <LayoutContext.Provider
      value={{
        showHomebar,
        setShowHomebar,
        alert,
        setAlert,
        showOrderSummary,
        setShowOrderSummary,
      }}
    >
      <div className="p-4">{children}</div>
      {((totalPrice > 0 && showOrderSummary) || showHomebar) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white z-10 rounded-t-xl shadow-lg shadow-black">
          {(totalPrice > 0 && showOrderSummary) && <OrderSummary />}
          {showHomebar && <Homebar />}
        </div>
      )}
      {alert?.status === "alert" && <Alert />}
      {alert?.status === "toast" && <Toast />}
    </LayoutContext.Provider>
  );
}
