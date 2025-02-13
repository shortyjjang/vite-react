import { useLayout } from "../../provider/LayoutProvider";
import IconCheckMono from "../../assets/images/icon-check-mono";
import { useEffect } from "react";

export default function Toast() {
  const { alert, setAlert } = useLayout();
  useEffect(() => {
    if (alert?.title) {
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  }, [alert]);
  return <div className="fixed bottom-0 left-4 right-4 p-4 bg-gray-800 text-white rounded-lg flex items-center gap-2 z-[+50]">
    <span className="bg-green-500 text-white rounded-full aspect-square w-4"><IconCheckMono /></span>
    {alert?.title}
  </div>;
}
