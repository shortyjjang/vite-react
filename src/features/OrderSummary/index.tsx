import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useOrderStore from "../../store/orderStore";

export default function OrderSummary() {
  const { order } = useOrderStore();
  const navigate = useNavigate();
  const totalPrice = order.orders.reduce(
    (acc, curr) =>
      acc +
      (curr.price +
        (curr.options || []).reduce(
          (acc, curr) => acc + (curr.additionalPrice || 0),
          0
        ) *
          (curr.quantity || 0)),
    0
  );
  if (totalPrice > 0) {
    return (
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col">
          <span className="text-gray-500 font-semibold">총 주문 금액</span>
          <b>{totalPrice.toLocaleString()}원</b>
        </div>
        <Button variant="primary" onClick={() => {
          navigate('/order');
        }}>주문하기</Button>
      </div>
    );
  }
  return null;
}
