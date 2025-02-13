import SummaryCard from "../../../features/Store/Menu/SummaryCard";
import IconArrow from "../../../assets/images/icon-arrow";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMenuItem } from "../../../lib/getMenuItem";
import { MenuItemProps, OptionProps } from "../../../features/Store/StoreItem";
import IconCheckMono from "../../../assets/images/icon-check-mono";
import useOrderStore from "../../../store/orderStore";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import Button from "../../../components/Button";
import { useLayout } from "../../../provider/LayoutProvider";

export default function MenuDetail() {
  const { pathname } = useLocation();
  const storeId = pathname.split("/")[2];
  const menuId = pathname.split("/")[4];
  const navigate = useNavigate();
  const { order, setOrder } = useOrderStore();
  const { setAlert, setShowOrderSummary } = useLayout();
  const { data: menu, isLoading } = useQuery<MenuItemProps>({
    queryKey: ["menu", storeId, menuId],
    queryFn: async () => {
      const menu = await getMenuItem(storeId, menuId);
      return menu;
    },
  });
  const changeOrderQuantity = (quantity: number) => {
    setOrder({
      ...order,
      orders: order.orders.map((orderItem) =>
        orderItem.menuId === Number(menuId)
          ? { ...orderItem, quantity: quantity }
          : orderItem
      ),
    });
  };
  const currentOrder = (order.orders || []).find(
    (orderItem) => Number(orderItem.menuId) === Number(menuId)
  );
  const selectOption = (option: OptionProps, optionGroupName: string) => {
    if (
      (menu?.optionGroups || []).some(
        (group) =>
          group.name === optionGroupName &&
          (group.maxSelectableCount || 0) <=
          (currentOrder?.options || []).filter(
            (o) => o.optionGroupName === group.name
          ).length
      )
        ) {
      setAlert({
        title: "최대 선택 개수를 초과할 수 없습니다.",
        status: "toast",
      });
      return;
    }
    setOrder({
      ...order,
      orders: order.orders.map((orderItem) =>
        orderItem.menuId === Number(menuId)
          ? {
              ...orderItem,
              options: orderItem.options.some((o) => o.name === option.name)
                ? orderItem.options.filter((o) => o.name !== option.name)
                : [
                    ...orderItem.options,
                    {
                      name: option.name,
                      optionGroupName: optionGroupName,
                      additionalPrice: option.additionalPrice,
                    },
                  ],
            }
          : orderItem
      ),
    });
  };
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
              storeId: excludeOrder.length > 0 ? order.storeId : 0,
              minOrderPrice: excludeOrder.length > 0 ? order.minOrderPrice : 0,
              orders: excludeOrder,
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
              {(
                (menu.price || 0) +
                currentOrder.options.reduce(
                  (acc, option) => acc + (option.additionalPrice || 0),
                  0
                ) *
                  currentOrder.quantity
              ).toLocaleString()}
              원
            </span>
          </li>
          <li className="flex items-center gap-2 justify-between">
            <label className="text-gray-500">수량</label>
            <div className="-mr-2 flex items-center">
              {currentOrder.quantity > 1 && (
                <button
                  onClick={() => changeOrderQuantity(currentOrder.quantity - 1)}
                  className="px-2 py-4"
                >
                  <IconArrow className="w-4 h-4 rotate-180" />
                </button>
              )}
              {currentOrder.quantity}
              <button
                onClick={() => changeOrderQuantity(currentOrder.quantity + 1)}
                className="px-2 py-4"
              >
                <IconArrow className="w-4 h-4" />
              </button>
            </div>
          </li>
        </ul>
        {(menu.optionGroups || []).map((optionGroup) => (
          <div key={optionGroup.name}>
            <hr className="h-3 bg-gray-100 border-0 -mx-4 w-[calc(100vw+2rem)]" />
            <h3 className="text-gray-800 font-semibold flex items-center gap-2 justify-between py-4">
              {optionGroup.name}
              {(optionGroup.minSelectableCount || 0) > 0 && (
                <small className="text-gray-500">필수</small>
              )}
            </h3>
            <ul>
              {(optionGroup.options || []).map((option) => (
                <li
                  key={option.name}
                  className="flex items-center gap-2 justify-between"
                >
                  <div className="text-gray-800 flex flex-col">
                    <label>{option.name}</label>
                    {(option?.additionalPrice || 0) > 0 && (
                      <span className="text-sm text-gray-500">
                        + {(option?.additionalPrice || 0).toLocaleString()}원
                      </span>
                    )}
                  </div>
                  <button
                    className={twMerge(
                      "p-4 -mr-4",
                      currentOrder.options.find((o) => o.name === option.name)
                        ? "text-blue-500"
                        : "text-gray-300"
                    )}
                    onClick={() => selectOption(option, optionGroup.name)}
                  >
                    <IconCheckMono className="w-6 h-6" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="sticky bottom-0 left-0 right-0 bg-white p-4 flex flex-col">
          <span className="text-center text-gray-500 pb-4">
            최소주문금액 {order.minOrderPrice.toLocaleString()}원
          </span>
          <Button size="lg" className="w-full" variant="primary" onClick={addToOrder}>
            담기
          </Button>
        </div>
      </div>
    );
  return <div>Menu not found</div>;
}
