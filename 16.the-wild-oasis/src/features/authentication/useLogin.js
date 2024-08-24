import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin({email, password}){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: login, isLoading} = useMutation({
        mutationFn: () => loginApi({email, password}),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            toast.success("You have been logged in successfully!")
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    return {login, isLoading};
}

