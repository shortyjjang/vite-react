import Button from "../../components/Button";
import useOrderStore from "../../store/orderStore";

export default function OrderSummary() {
  const totalPrice = useOrderStore((state) => state.totalPrice);
  if (totalPrice > 0) {
    return (
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col">
          <span className="text-gray-500 font-semibold">총 주문 금액</span>
          <b>{totalPrice.toLocaleString()}원</b>
        </div>
        <Button>주문하기</Button>
      </div>
    );
  }
  return null;
}
