import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useUpdateUser(){
    const queryClient = useQueryClient();
    const {mutate: updateUser, isLoading: isUpdating} = useMutation({
        mutationFn: ({password, fullName, avatar}) => updateUserApi({password, fullName, avatar}),
        onSuccess: ({user}) => {
            console.log(user)
            toast.success("User has been updated successfully");
            queryClient.setQueryData(["user"], user)
            // queryClient.invalidateQueries({
            //     queryKey: ["user"]
            // });
        },
        onError: (err) => toast.error(err.message)
    });
    return {updateUser, isUpdating}
}   