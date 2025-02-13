import BackHeader from "../../components/BackHeader";
import { useNavigate } from "react-router-dom";
import Title from "../../components/TItle";
import IconArrow from "../../assets/images/icon-arrow";
import Button from "../../components/Button";
import useOrderStore from "../../store/orderStore";
import Hr from "../../components/Hr";
import { useEffect } from "react";
import { useLayout } from "../../provider/LayoutProvider";
import OrderBottom from "../../features/Order/OrderBottom";
import IconNotifyLine from "../../assets/images/icon-notify-line";
import OrderItem from "../../features/Order/OrderItem";
import IconNotify from "../../assets/images/icon-notify";
import useInfoStore from "../../store/infoStore";

export default function Order() {
  const navigate = useNavigate();
  const { order, totalPrice } = useOrderStore();
  const { address } = useInfoStore();
  const { setShowOrderSummary, setAlert } = useLayout();
  useEffect(() => {
    setShowOrderSummary(order.orders.length === 0);
    if (order.orders.length === 0) {
      navigate(-1);
    }
    return () => {
      setShowOrderSummary(true);
    };
  }, [order.orders.length]);
  return (
    <div>
      <BackHeader onBack={() => navigate(-1)} />
      <Title title="배달주소" element="h3" />
      <div className="flex items-center justify-between gap-2 mb-4">
        <address className="not-italic font-semibold">
          {address}
        </address>
        <button className="text-gray-500" onClick={() => navigate('/setting/address')}>
            <IconArrow />
        </button>
      </div>
      <div className="grid grid-cols-[1.25rem_auto_60px] border-t border-gray-200 p-4 gap-x-4 -mx-4 w-screen">
        <div className="flex items-center text-red-500 row-span-2">
          <IconNotify className="w-5 h-5" />
        </div>
        <h4 className="text-blue-500 font-semibold">
          배달 받는 곳이 이곳이 맞나요?
        </h4>
        <div className="row-span-2 flex items-center justify-end">
          <Button size="sm" onClick={() => setAlert({
            title: "배달받을 수 있는 주소지로 수정해주세요",
            buttonText: "수정하기",
            onCancel: () => {
              navigate('/setting/address');
            },
            status: "alert",
          })}>아니요</Button>
        </div>
        <p className="text-gray-500 text-sm">
          현재 주문하는 곳과 배달받는 곳이 달라요.
        </p>
      </div>
      <div>
        <Hr />
        <Title
          title={order.storeName}
          element="h3"
          rightComponent={
            order.minOrderPrice > totalPrice ? (
              <span className="text-red-500 flex items-center gap-1 text-sm">
                <IconNotifyLine className="w-3 h-3" /> 최소금액 미달
              </span>
            ) : undefined
          }
        />
        <ul className="pb-3 flex flex-col gap-2">
          {(order.orders || []).map((menu) => (
            <OrderItem key={menu.menuId} {...menu} />
          ))}
        </ul>
        <button className="text-blue-500 border-t border-gray-200 p-4 -mx-4 w-screen">
          + 더 담기
        </button>
      </div>
      <div>
        <Hr />
        <ul className="py-4 flex flex-col gap-2">
          <li className="flex justify-between items-center">
            <span className="text-gray-500">주문금액</span>
            <span className="text-gray-800">
              {(totalPrice - order.deliveryFee).toLocaleString()}원
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-500">배달요금</span>
            <span className="text-gray-800">
              {order.deliveryFee.toLocaleString()}원
            </span>
          </li>
        </ul>
      </div>
      <OrderBottom
        disabled={order.minOrderPrice > totalPrice}
        minOrderPrice={order.minOrderPrice}
        onClick={() => {}}
        buttonText={`${totalPrice.toLocaleString()}원 주문하기`}
      />
    </div>
  );
}
