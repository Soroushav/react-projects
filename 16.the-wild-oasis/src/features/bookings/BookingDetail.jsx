import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import Empty from "../../ui/Empty"
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "./useDeleteBooking";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking = {}, isLoading } = useBooking();
  const { id: bookingId, status } = booking;
  const moveBack = useMoveBack();
  const { deleteBooking } = useDeleteBooking(bookingId);
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if(!bookingId) return <Empty resourceName="booking"/>
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button
              variation="primary"
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check In
            </Button>
          )}
          {status === "checked-in" && (
            <Button variation="primary">Check out</Button>
          )}
          <Modal.Open opens="delete">
            <Button icon={<HiTrash />} variation="danger">
              Delete booking
            </Button>
          </Modal.Open>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => {
              deleteBooking();
              navigate(-1);
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
