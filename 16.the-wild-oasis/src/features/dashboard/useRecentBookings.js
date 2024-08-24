import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const startDate = subDays(new Date(), numDays).toISOString();
  const { data: recentBookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(startDate),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { recentBookings, isLoading, numDays };
}

export { useRecentBookings };
