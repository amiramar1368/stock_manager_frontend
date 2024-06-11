import { useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteRecord({ title, handleRemove }) {
  const [show, setShow] = useState(false);
  const handleCloseModal = () => {
    setShow(false);
  };

  const handleShowModal = () => setShow(true);

  return (
    <>
      <i onClick={handleShowModal} className="bi bi-trash3-fill bi-button"></i>
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
