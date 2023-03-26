import React from 'react';

function Modal(props) {
  const { title, content, visible, onClose } = props;

  if (!visible) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h3>{title}</h3>
        <button onClick={onClose}>X</button>
      </div>
      <div className="modal-content">
        {content}
      </div>
    </div>
  );
}

export default Modal;
