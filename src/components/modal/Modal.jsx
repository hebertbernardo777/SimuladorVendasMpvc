import React, { Children } from "react";
import { IoIosClose } from "react-icons/io";
import "./Modal.css";
import Clients from "../../pages/Clients/Clients";

const Modal = ({ isOpen, onClose, children }) => {
  if (isOpen) {
    return (
      <div className="modal-background">
        <div className="container-modal">{children}
        <IoIosClose className="close-icon" onClick={onClose} />
        
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
