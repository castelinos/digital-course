import React, { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/lessons.css';

interface ModalProps {
    children?: ReactNode,
    showModal: boolean,
    toggleShowModal: Function,
    backgroundTheme: string,
}

const Modal: React.FC<ModalProps> = ({ children, showModal, toggleShowModal, backgroundTheme }) => {

    const visible = showModal ? "visible":"hidden";
    let backgroundHexCode = "#ffffff";
    let fontColor = "#000000";

    if( backgroundTheme === "dark") {
      backgroundHexCode = "#000000";
      fontColor = "#ffffff"
    }

    return (
      <div
        style={{
            zIndex:"10",
            position:"fixed",
            inset:0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:"rgba(0, 0, 0, 0.7)",
            visibility: visible
        }}
      >
        <div className="card" style={{maxWidth:"600px",backgroundColor: backgroundHexCode, padding:"0"}}>
            <div style={{ 
              zIndex:3,
              position:"absolute",
              top:10,
              right:10,
              cursor:"pointer", 
              margin:"15px 15px 0 0", 
              backgroundColor:"transparent",
              color:fontColor 
              }} 
              onClick={()=>{ toggleShowModal(false) 
            }}>&#9932;</div>

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




