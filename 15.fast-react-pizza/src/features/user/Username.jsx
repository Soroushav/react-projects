import { useSelector } from "react-redux"

function Username() {
    const username = useSelector(store => store.user.username);
    return (
        <div className="text-sm font-semibold hidden md:block">
            {username}
        </div>
    )
}

export default Username
