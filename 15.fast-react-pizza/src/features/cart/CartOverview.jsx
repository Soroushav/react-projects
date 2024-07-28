import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
function CartOverview() {
  const numPizzas = useSelector(getTotalCartQuantity);
  const sumPrice = useSelector(getTotalCartPrice);
  if(!numPizzas) return null;
  return (
    <div className="bg-stone-800 text-xs text-stone-200 uppercase px-4 py-4 sm:px-6 md:text-base flex items-center justify-between">
      <p className="font-semibold text-stone-300 space-x-4 sm:space-x-6">
        <span>{numPizzas} pizzas</span>

        <span>${sumPrice}</span>
      </p>
      {/* <a href="#">Open cart &rarr;</a> */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
