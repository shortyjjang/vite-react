import InputNumber from '../../../components/InputNumber';
import useOrderStore, { OrderItemProps } from '../../../store/orderStore';


export default function OrderItem({
  image,
  name,
  price,
  ingredient,
  options,
  quantity,
  menuId,
}: OrderItemProps) {
    const { increaseQuantity, decreaseQuantity } = useOrderStore();
    return (<li
        className="grid grid-cols-[54px_auto_100px] gap-x-4 gap-y-1"
      >
        <div className="row-span-3 flex items-center">
          <img
            src={image || "https://placehold.co/400x400"}
            alt={name}
            className="w-full object-cover aspect-square rounded-md"
          />
        </div>
        <h4 className="font-medium">{name} </h4>
        <div className="row-span-3 flex justify-end items-center">
          <InputNumber
            unit="개"
            size="sm"
            value={quantity}
            increase={() => increaseQuantity(Number(menuId))}
            decrease={() => decreaseQuantity(Number(menuId))}
          />
        </div>
        <p className="text-sm text-gray-500">
          {(ingredient || []).join(", ")}
        </p>
        <p className="text-sm text-gray-500">
          {(
            (price +
              (options || []).reduce(
                (acc, option) => acc + (option.additionalPrice || 0),
                0
              )) *
            quantity
          ).toLocaleString()}
          원
        </p>
      </li>
    )
}
