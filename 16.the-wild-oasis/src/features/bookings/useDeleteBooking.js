import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking(bookingId){
    const queryClient = useQueryClient();
    const {mutate: deleteBooking, isLoading: isDeleting} = useMutation({
        mutationFn: () => deleteBookingApi(bookingId),
        onSuccess: (data) => {
            toast.success(`Booking #${bookingId} has been deleted`);
            queryClient.invalidateQueries({active: true})
        } 
    })

    return {deleteBooking, isDeleting}
}