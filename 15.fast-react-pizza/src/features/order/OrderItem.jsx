import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-2">
      <div className="flex gap-2 flex-wrap justify-between">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500 tracking-wide  italic uppercase">
        {isLoadingIngredients ? "Loading" : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
