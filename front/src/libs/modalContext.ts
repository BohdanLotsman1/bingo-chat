import { createContext } from "react";

export interface IModalContext {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const DefaultModalContextValues = {
  isOpen: false,
  setIsOpen: (isOpen: boolean) => isOpen,
};

export const ModalContext = createContext<IModalContext>(
  DefaultModalContextValues
);
