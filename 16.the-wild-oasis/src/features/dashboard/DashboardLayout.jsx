import styled from "styled-components";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner"
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart"

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Today from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
  margin-top: 1.4rem;
`;

function DashboardLayout() {
  const { recentBookings, isLoading: isLoading1, numDays } = useRecentBookings();
  const {
    recentStays,
    recentConfirmedStays,
    isLoading: isLoading2,
  } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();
  if(isLoading1|| isLoading2 || isLoading3) return <Spinner/>
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={recentConfirmedStays}
        numDays={numDays}
        numCabins={cabins.length}
      />
      <Today/>
      <DurationChart confirmedStays={recentConfirmedStays}/>
      <SalesChart bookings={recentBookings} numDays={numDays}/>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
