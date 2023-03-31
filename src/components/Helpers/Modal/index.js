import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal({ show, setShow, title, body,textSecondary }) {

    const handleClose = () => {
        setShow(false);
    };

    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    {textSecondary}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;
