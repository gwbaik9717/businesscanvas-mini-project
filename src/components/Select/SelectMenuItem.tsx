import React, { useEffect } from "react";
import { useSelectContext } from "./Select";

interface SelectMenuItemProps {
  value: React.Key;
  children?: React.ReactNode;
}

export const SelectMenuItem: React.FC<SelectMenuItemProps> = ({
  value: key,
  children,
}) => {
  const { selectMenuItem, registerOption } = useSelectContext();

  useEffect(() => {
    registerOption({ key, label: String(children) });
  }, [key, children, registerOption]);

  const handleClick = () => {
    selectMenuItem(key);
  };

  return (
    <li role="option" onClick={handleClick}>
      {children}
    </li>
  );
};
