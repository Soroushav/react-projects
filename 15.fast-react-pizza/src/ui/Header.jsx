import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import Username from "../features/user/Username"
import { useSelector } from "react-redux"
function Header() {
    const username = useSelector(store => store.user.username);
    return (
        <div className="bg-yellow-400 uppercase px-4 py-3 sm:px-6 flex items-center justify-between">
        <Link to="/" className="tracking-[5px]">Fast React Pizza Co.</Link>
        <SearchOrder />
        {username ? <Username/> : ""}
        
        </div>
    )
}

export default Header
