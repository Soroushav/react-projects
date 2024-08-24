import { HiOutlineBriefcase, HiOutlineCalendar, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, numDays, numCabins }) {
    const numBookings = bookings.length;
    const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const checkins = confirmedStays.length;
    const occupancyRate = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * numCabins);
  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
        color="blue"
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
        color="green"
      />
      <Stat
        title="Check ins"
        icon={<HiOutlineCalendar />}
        value={checkins}
        color="indigo"
      />
     <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
