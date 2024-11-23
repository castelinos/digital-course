import React, { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/lessons.css';

interface ModalProps {
    children?: ReactNode,
    showModal: boolean,
    toggleShowModal: Function,
}

const Modal: React.FC<ModalProps> = ({ children, showModal, toggleShowModal }) => {

    const visible = showModal ? "visible":"hidden"

    return (
      <div
        style={{
            zIndex:"3",
            position:"fixed",
            inset:0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            visibility: visible
        }}
      >
        <div className="card">
            <div className="card-body"
                style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center"
                }}
            >
              { children }
            </div>
        </div>
      </div>
    );
};

export default Modal;




