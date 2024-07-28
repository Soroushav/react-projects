import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart"
// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((store) => store.user.username);
  const dispatch = useDispatch();
  function handleClearCart() {
    dispatch(clearCart());
  }
  
  if(cart.length === 0 ) return <EmptyCart/>
  return (
    <div className="px-3 py-3">
      {/* <Link to="/menu">&larr; Back to menu</Link> */}

      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

        <h2 className="mt-7 text-lg font-semibold">Your cart, {username}</h2>
        <ul className="divide-y divide-stone-200 border-b">
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </ul>
        <div className="mt-6 space-x-2">
          <Button to="/order/new" type="primary">
            Order pizzas
          </Button>
          {/* <button>Clear cart</button> */}
          <Button type="secondary" onClick={handleClearCart}>
            Clear cart
          </Button>
        </div>
      
    </div>
  );
}

export default Cart;
