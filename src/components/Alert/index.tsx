import { useLayout } from "../../provider/LayoutProvider";
import Button from "../Button";
export interface AlertProps {
  title: string;
  description?: string;
  buttonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
export default function Alert() {
  const { alert, setAlert } = useLayout();
  
  if (alert?.title)
    return (
      <>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[+50]" />
        <div className="bg-white rounded-lg p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[+51]">
          <h2 className="text-lg font-bold">{alert?.title}</h2>
          <p className="text-sm text-gray-500">{alert?.description}</p>
          <div className="flex gap-2 pt-4">
            {alert?.onCancel && <Button className="w-full" size="lg" onClick={() => {
                setAlert(null)
                alert?.onCancel?.()
              }}>취소</Button>}
            {alert?.onConfirm && <Button className="w-full" size="lg" variant="primary" onClick={() => {
                setAlert(null)
                alert?.onConfirm?.()
              }}>확인</Button>}
          </div>
        </div>
      </>
    );
}
