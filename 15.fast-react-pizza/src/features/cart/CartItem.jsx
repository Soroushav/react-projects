import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { getCurrentQuantity } from "./cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));
  return (
    <li className="py-4 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-center gap-4">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
