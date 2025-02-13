import SummaryCard from "../../../features/Store/Menu/SummaryCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMenuItem } from "../../../lib/getMenuItem";
import { MenuItemProps } from "../../../features/Store/StoreItem";
import useOrderStore from "../../../store/orderStore";
import { useEffect } from "react";
import { useLayout } from "../../../provider/LayoutProvider";
import OrderBottom from "../../../features/Order/OrderBottom";
import Title from "../../../components/TItle";
import Hr from "../../../components/Hr";
import InputNumber from "../../../components/InputNumber";
import MenuOptionItem from "../../../features/Store/Menu/MenuOptionItem";

export default function MenuDetail() {
  const { pathname } = useLocation();
  const storeId = pathname.split("/")[2];
  const menuId = pathname.split("/")[4];
  const navigate = useNavigate();
  const { order, totalPrice, setOrder, increaseQuantity, decreaseQuantity } = useOrderStore();
  const { setAlert, setShowOrderSummary } = useLayout();
  const { data: menu, isLoading } = useQuery<MenuItemProps>({
    queryKey: ["menu", storeId, menuId],
    queryFn: async () => {
      const menu = await getMenuItem(storeId, menuId);
      return menu;
    },
  });
  const currentOrder = (order.orders || []).find(
    (orderItem) => Number(orderItem.menuId) === Number(menuId)
  );
  const checkMinOption = () => {
    return new Promise<boolean>((resolve) => {
        if (
          (menu?.optionGroups || []).some(
            (group) =>
              (group.minSelectableCount || 0) >
              (currentOrder?.options || []).filter(
                (o) => o.optionGroupName === group.name
              ).length
          )
        ) {
          resolve(false);
          return;
      }
      resolve(true);
    });
  };
  const addToOrder = async () => {
    const isMinOption = await checkMinOption();
    if (isMinOption) {
      navigate(-1);
      return;
    }
    setAlert({
      title: "필수 항목을 선택해주세요.",
      status: "toast",
    });
  };
  useEffect(() => {
    setShowOrderSummary(!currentOrder);
    if (!currentOrder) {
      navigate(-1);
    } 
    return () => {
      setShowOrderSummary(true);
    }
  }, [currentOrder]);
  if (isLoading) return <div>Loading...</div>;
  if (menu?.name && currentOrder)
    return (
      <div>
        <SummaryCard
          onBack={() => {
            const excludeOrder = order.orders.filter(
              (orderItem) => orderItem.menuId !== Number(menuId)
            );
            navigate(-1);
            setOrder({
              storeName: order.storeName,
              storeId: excludeOrder.length > 0 ? order.storeId : 0,
              minOrderPrice: excludeOrder.length > 0 ? order.minOrderPrice : 0,
              orders: excludeOrder,
              deliveryFee: order.deliveryFee,
            });
          }}
          image={menu.image || "https://placehold.co/600x400"}
          name={menu.name}
          reviewCount={menu.reviewCount}
          description={menu.description}
        />
        <ul className="mt-4">
          <li className="flex items-center gap-2 justify-between py-4">
            <label className="text-gray-500">가격</label>
            <span>
              {totalPrice.toLocaleString()}
              원
            </span>
          </li>
          <li className="flex items-center gap-2 justify-between">
            <label className="text-gray-500">수량</label>
            <InputNumber value={currentOrder.quantity} increase={() => increaseQuantity(Number(menuId))} decrease={() => decreaseQuantity(Number(menuId))} />
          </li>
        </ul>
        {(menu.optionGroups || []).map((optionGroup) => (
          <div key={optionGroup.name}>
            <Hr />
            <Title title={optionGroup.name} element="h3" className=" py-4" rightComponent={
              (optionGroup.minSelectableCount || 0) > 0 && (
                <small className="text-gray-500">필수</small>
              )
            } />
            <ul>
              {(optionGroup.options || []).map((option) => (
                <MenuOptionItem
                  key={option.name}
                  {...option}
                  isSelected={(currentOrder.options || []).find((o) => o.name === option.name) ? true : false}
                  optionGroupName={optionGroup.name}
                  menuId={Number(menuId)}
                />
              ))}
            </ul>
          </div>
        ))}
        <OrderBottom minOrderPrice={order.minOrderPrice || 0} buttonText="담기" onClick={addToOrder} />
      </div>
    );
  return <div>Menu not found</div>;
}
