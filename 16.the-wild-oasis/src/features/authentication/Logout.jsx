import { HiArrowRightOnRectangle } from "react-icons/hi2"
import ButtonIcon from "../../ui/ButtonIcon"
import { useLogout } from "./useLogout"
function Logout() {
    const {logout, isLoading} = useLogout();
    return (
        <ButtonIcon onClick={logout}>
            <HiArrowRightOnRectangle/>
        </ButtonIcon>
    )
}

export default Logout
