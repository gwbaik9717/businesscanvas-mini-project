import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { color, radius } from "../../styles/theme";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error(
      "Modal root not found. Please add <div id='modal-root'></div> to your HTML."
    );
    return null;
  }

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Backdrop onClick={onClose}>
      <Content
        onClick={(e) => {
          // Prevent closing when clicking inside the modal
          e.stopPropagation();
        }}
      >
        {children}
      </Content>
    </Backdrop>,
    modalRoot
  );
};

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background: ${color.icon};
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
`;

const Content = styled.div`
  background: ${color.bgContainer};
  border-radius: ${radius.borderRadiusSm};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
`;
