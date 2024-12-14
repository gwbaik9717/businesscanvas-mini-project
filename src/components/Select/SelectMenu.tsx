import React, { useEffect, useRef } from "react";
import { useSelectContext } from "./Select";

interface SelectMenuProps {
  children?: React.ReactNode;
}

export const SelectMenu: React.FC<SelectMenuProps> = ({ children }) => {
  const { isOpen, close } = useSelectContext();
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <ul
      ref={menuRef}
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
