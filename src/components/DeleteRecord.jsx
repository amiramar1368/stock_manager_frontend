import { useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrashCan } from "react-icons/fa6";

function DeleteRecord({ title, handleRemove }) {
  const [show, setShow] = useState(false);
  const handleCloseModal = () => {
    setShow(false);
  };

  const handleShowModal = () => setShow(true);

  return (
    <>
    <FaTrashCan onClick={handleShowModal} color="red" cursor="pointer"/>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you Sure {title} ?</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Are you Sure ?</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleRemove();
              handleCloseModal();
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteRecord;
