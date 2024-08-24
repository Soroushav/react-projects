import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
    const {
        error,
        data: cabins,
        isLoading,
      } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
      });
    return {isLoading, cabins}
}

export {useCabins}
