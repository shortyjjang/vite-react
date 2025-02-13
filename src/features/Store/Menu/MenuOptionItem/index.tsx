import { twMerge } from "tailwind-merge";
import useOrderStore, { OrderOptionItemProps } from "../../../../store/orderStore";
import IconCheckMono from "../../../../assets/images/icon-check-mono";
import { useLayout } from "../../../../provider/LayoutProvider";

interface OptionItemProps extends OrderOptionItemProps {
  isSelected: boolean;
  menuId: number;
}

export default function MenuOptionItem({
  name,
  additionalPrice = 0,
  isSelected,
  optionGroupName,
  menuId,
}: OptionItemProps) {
  const { order, setOrder } = useOrderStore();
  const { setAlert } = useLayout();
  const selectOption = (name: string, additionalPrice: number) => {
    if (
      (order.orders || []).find((orderItem) => orderItem.menuId === Number(menuId))?.options.some((o) => o.name === name)
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
              options: orderItem.options.some((o) => o.name === name)
                ? orderItem.options.filter((o) => o.name !== name)
                : [
                    ...orderItem.options,
                    {
                      name: name,
                      optionGroupName: optionGroupName,
                      additionalPrice: additionalPrice,
                    },
                  ],
            }
          : orderItem
      ),
    });
  };
  return (
    <li
      key={name}
      className="flex items-center gap-2 justify-between"
    >
      <div className="text-gray-800 flex flex-col">
        <label>{name}</label>
        {(additionalPrice || 0) > 0 && (
          <span className="text-sm text-gray-500">
            + {(additionalPrice || 0).toLocaleString()}원
          </span>
        )}
      </div>
      <button
        className={twMerge(
          "p-4 -mr-4",
          isSelected
            ? "text-blue-500"
            : "text-gray-300"
        )}
        onClick={() => selectOption(name, additionalPrice)}
      >
        <IconCheckMono className="w-6 h-6" />
      </button>
    </li>
  )
}
