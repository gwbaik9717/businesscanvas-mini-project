import React from "react";
import { useSelectContext } from "./Select";

interface SelectMenuProps {
  children?: React.ReactNode;
}

export const SelectMenu: React.FC<SelectMenuProps> = ({ children }) => {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;

  return (
    <ul
      role="listbox"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        marginTop: 4,
        padding: 0,
        listStyle: "none",
        border: "1px solid #ccc",
        borderRadius: 4,
        backgroundColor: "#fff",
        zIndex: 999,
      }}
    >
      {children}
    </ul>
  );
};
