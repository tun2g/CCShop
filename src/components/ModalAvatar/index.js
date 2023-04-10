import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
function ModalAvatar({
  show,
  setShow,
  title,
  body,
  btn1,
  btn2,
  image,
  handleChange,
}) {
  const handleClose = () => {
    setShow(false);
  };
  const handleOke = () => {
    handleChange(true);
    setShow(false);
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOke} variant="secondary">
          {btn1}
        </Button>
        <Button onClick={handleClose} variant="secondary">
          {btn2}
        </Button>
        <Image
          src={image ? URL.createObjectURL(image) : ""}
          style={{ width: "300px" }}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAvatar;
