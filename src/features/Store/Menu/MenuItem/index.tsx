import { MenuItemProps } from "../../StoreItem";
import Button from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import useOrderStore from "../../../../store/orderStore";
import { useLayout } from "../../../../provider/LayoutProvider";

export default function MenuItem({
  menu,
  storeId,
  minOrderAmount,
}: {
  menu: MenuItemProps;
  storeId: number;
  minOrderAmount: number;
}) {
  const navigate = useNavigate();
  const {setAlert} = useLayout();
  const { order, setOrder } = useOrderStore();
  const checkAvailableOrder = () => {
    return new Promise<boolean>((resolve) => {
      if (
        // order.storeId &&
        order.storeId !== storeId)
       {
        setAlert({
          title: "주문서에는 같은 가게만 담을 수 있어요",
          description: "새로 담고 이전에 담은 메뉴는 삭제할까요?",
          status: 'alert',
          onConfirm: () => {
            resolve(true);
          },
          onCancel: () => {
            resolve(false);
          },
        }
        ) 
      }
      resolve(true);
    });
  }
  const addToOrder = async (menu: MenuItemProps) => {
    const isAvailable = await checkAvailableOrder();
    if (isAvailable) {
      setOrder({
        storeId: storeId,
        minOrderPrice: minOrderAmount,
        orders: order.orders.some(
          (orderItem) => orderItem.menuId === menu.id
        )
          ? order.orders.map((orderItem) =>
              orderItem.menuId === menu.id
                ? {
                    ...orderItem,
                    quantity: orderItem.quantity + 1,
                  }
                : orderItem
            )
          : [
              ...order.orders,
              {
                menuId: menu.id,
                name: menu.name,
                price: menu.price,
                quantity: 1,
                options: [],
              },
            ],
      });
      navigate(`/store/${storeId}/menu/${menu.id}`);
    }
  }
  return (
    <li className="grid grid-cols-[54px_auto_100px] gap-x-4 gap-y-1">
      <div className="row-span-3 flex items-center">
        <img
          src={menu.image || "https://placehold.co/400x400"}
          alt={menu.name}
          className="w-full object-cover aspect-square rounded-md"
        />
      </div>
      <h4 className="font-medium">
        {menu.name}{" "}
        {menu.isBest && <b className="font-medium text-blue-500">BEST</b>}
      </h4>
      <div className="row-span-3 flex justify-end items-center">
        <Button
          variant="primary"
          onClick={() => addToOrder(menu)}
        >
          담기
        </Button>
      </div>
      <p className="text-sm text-gray-500">{menu.price.toLocaleString()}원</p>
      <p className="text-sm text-gray-500">
        {(menu.ingredient || []).join(", ")}
      </p>
    </li>
  );
}
