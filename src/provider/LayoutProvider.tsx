import { useContext, useState } from "react";
import { createContext } from "react";
import Homebar from "../features/Homebar";
import OrderSummary from "../features/OrderSummary";
import useOrderStore from "../store/orderStore";
import Alert, { AlertProps } from "../components/Alert";
import Toast from "../components/Toast";

interface LayoutAlertProps extends AlertProps {
  status?: 'alert' | 'toast';
}

interface LayoutContextType {
  showHomebar: boolean;
  setShowHomebar: (show: boolean) => void;
  alert: LayoutAlertProps | null;
  setAlert: (alert: LayoutAlertProps | null) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  showHomebar: false,
  setShowHomebar: () => {},
  alert: null,
  setAlert: () => {},
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
  const [alert, setAlert] = useState<LayoutAlertProps | null>(null);
  return (
    <LayoutContext.Provider
      value={{
        showHomebar,
        setShowHomebar,
        alert,
        setAlert,
      }}
    >
      <div className="p-4">{children}</div>
      {(totalPrice > 0 || showHomebar) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white z-10 rounded-t-xl shadow-lg shadow-black">
          {totalPrice > 0 && <OrderSummary />}
          {showHomebar && <Homebar />}
        </div>
      )}
      {alert?.status === 'alert' && <Alert />}
      {alert?.status === 'toast' && <Toast />}
    </LayoutContext.Provider>
  );
}
