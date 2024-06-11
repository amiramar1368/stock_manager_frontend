import { useState } from "react";
import Modal from "react-bootstrap/Modal";


import useAxios from "../../customHook/useAxios";

function ACtive2FA() {
  const httpServise = useAxios();
  const [QRCode, setQRCode] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const getQRCodeURL = async () => {
    const data = await httpServise.get("/users/qrcode-url");
    if (data.success) {
      setQRCode(data.body.qrCodeUrl);
    }
  };

  const handleShow = () => {
    setShow(true);
    getQRCodeURL();
  };

  const Active2Fa = async () => {
    await httpServise.put("/users/active2Fa");
  };

  return (
    <>
      <span onClick={handleShow} className="d-block w-100">
        Active 2FA
      </span>
      <Modal show={show} onHide={handleClose} className="QRCode">
        <Modal.Header closeButton>Scan this QR Code With Your Phone Then Click Active</Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <img src={QRCode} alt="QRCode" />
          </div>
          <div className="text-center">
            <button
              onClick={() => {
                handleClose();
                Active2Fa();
              }}
              className=" btn btn-outline-info mt-2"
            >
              Active
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ACtive2FA;
