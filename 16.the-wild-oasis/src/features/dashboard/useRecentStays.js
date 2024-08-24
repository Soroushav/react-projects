import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const startDate = subDays(new Date(), numDays).toISOString();
  const { data: recentStays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(startDate),
    queryKey: ["stays", `last-${numDays}`],
  });
  const recentConfirmedStays = recentStays?.filter(stay => stay.status !== "unconfirmed");
  return { recentStays, isLoading, recentConfirmedStays };
}

export { useRecentStays };
