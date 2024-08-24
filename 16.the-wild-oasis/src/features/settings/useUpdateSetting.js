import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";
function useUpdateSetting() {
    const queryClient = useQueryClient();
    const {mutate: updateSetting, isLoading: isUpdating} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Settings has been updated successfully!");
            queryClient.invalidateQueries({
                queryKey: ["settings"]
            })
        }
    })
    return {isUpdating, updateSetting};
}

export {useUpdateSetting}
