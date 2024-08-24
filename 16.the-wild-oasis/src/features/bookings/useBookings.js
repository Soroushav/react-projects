import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // Filter
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue };

  // Sort
  const sortByValue = searchParams.get("sort-by");
  const sortBy = !sortByValue
    ? null
    : {
        field: sortByValue.split("-").at(0),
        value: sortByValue.split("-").at(1) === "asc",
      };

  // Page
  const page = Number(searchParams.get("page")) || 1;
  const {
    error,
    data: { data: bookings, count } = {},
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (pageCount !== page) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }
  return { isLoading, bookings, count, error };
}
