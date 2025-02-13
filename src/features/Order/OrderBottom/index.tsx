import Button from "../../../components/Button";

export default function OrderBottom({
    disabled = false,
    minOrderPrice = 0,
    onClick,
    buttonText = "",
}: {
    minOrderPrice: number;
    onClick: () => void;
    buttonText?: string;
    disabled?: boolean;
}) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white p-4 -ml-4 -mr-4 w-screen flex flex-col">
      <span className="text-center text-gray-500 pb-4">
        최소주문금액 {minOrderPrice.toLocaleString()}원
      </span>
      <Button size="lg" className="w-full" disabled={disabled} onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  )
}
