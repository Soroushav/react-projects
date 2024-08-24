import toast from "react-hot-toast";
import { logout as logoutApi} from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export function useLogout(){
    const navigate = useNavigate();
    const {mutate: logout, isLoading} = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            toast.success("You have been logged out successfully!")
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    return {logout, isLoading};
}

