import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens={"create-cabin"}>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name={"create-cabin"}>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <StyledButton onClick={() => setIsOpenModal(true)}>Add new cabin</StyledButton>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal((isOpen) => !isOpen)}>
//           <CreateCabinForm
//             onCloseModal={() => setIsOpenModal((isOpen) => !isOpen)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
