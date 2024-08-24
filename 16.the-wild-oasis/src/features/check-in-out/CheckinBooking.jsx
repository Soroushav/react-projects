import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking = {}, isLoading } = useBooking();
  const { checkin, isChekingIn } = useCheckin();
  const { settings, isLoadingSettings } = useSettings();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings?.breakfastPrice * numGuests;

  useEffect(() => {
    setConfirmPayment(booking?.isPaid ?? false);
    setAddBreakfast(booking?.hasBreakfast ?? false);
  }, [booking]);

  function handleCheckin() {
    if (!confirmPayment) return;
    if (addBreakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    else checkin({ bookingId, breakfast: {} });
    navigate("/");
  }

  if (isLoading || isLoadingSettings) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          disabled={hasBreakfast}
          onChange={() => {
            setAddBreakfast((has) => !has);
            setConfirmPayment(false)
          }}
          id="breakfast"
        >
          Want to add breakfast for{" "}
          <strong>{formatCurrency(optionalBreakfastPrice)}</strong>
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={confirmPayment}
          disabled={confirmPayment}
          onChange={() => setConfirmPayment(true)}
          id="confirm"
        >
          I confirm that <strong>{guests.fullName}</strong> has paid the total
          amount of <strong>{addBreakfast? formatCurrency(totalPrice + optionalBreakfastPrice) + ` (${formatCurrency(totalPrice)}, ${formatCurrency(optionalBreakfastPrice)})` : formatCurrency(totalPrice)}</strong>
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPayment}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
