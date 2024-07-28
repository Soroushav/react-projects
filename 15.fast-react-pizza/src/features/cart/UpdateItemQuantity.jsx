import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  function increaseQuantity() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function decreaseQuantity() {
    dispatch(decreaseItemQuantity(pizzaId));
  }
  return (
    <div className="flex items-center gap-2">
      <Button type="round" onClick={decreaseQuantity}>
        -
      </Button>
      <p className="text-sm font-semibold">{currentQuantity}</p>
      <Button type="round" onClick={increaseQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
