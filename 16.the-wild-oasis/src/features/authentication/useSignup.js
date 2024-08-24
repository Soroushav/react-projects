import { useMutation } from "@tanstack/react-query";
import {signup as signupApi} from "../../services/apiAuth"
import toast from "react-hot-toast";
export function useSignup(){
    const {mutate: signup, isLoading} = useMutation({
        mutationFn: ({email, password, fullName}) => signupApi({email, password, fullName}),
        onSuccess: () => {
            toast.success("User has been created successfully");
        } 
    });
    return{signup, isLoading}
}