import { createPortal } from "react-dom";
import React, { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <div className="modal-content">
        {onClose && (
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};
