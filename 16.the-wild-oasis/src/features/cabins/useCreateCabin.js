import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin has been created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}

export { useCreateCabin };
