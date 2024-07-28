import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser"
import Button from "./Button";
function Home() {
  const username = useSelector(store => store.user.username);
  return (
    <div className="text-center px-4 my-10 sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        <span className="text-stone-800"> 
        The best pizza.
           </span>
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.
        </span>
      </h1>

     {
      username ?  <Button type="primary" to="/menu">Continue ordering, {username}</Button>
       :<CreateUser/>
    }
    </div>
  );
}

export default Home;
