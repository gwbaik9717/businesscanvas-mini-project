import React from "react";
import { useSelectContext } from "./Select";
import styled from "styled-components";
import { color, radius } from "../../styles/theme/theme";

interface SelectMenuProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "left" | "right";
}

// TODO: Detect if the menu is overflowing the viewport and adjust the position
export const SelectMenu: React.FC<SelectMenuProps> = ({
  children,
  variant = "left",
  style,
}) => {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;

  const getVariantStyle = () => {
    switch (variant) {
      case "left":
        return { left: 0, top: "100%", marginTop: 4 };
      case "right":
        return { right: 0, top: "100%", marginTop: 4 };
      default:
        return {};
    }
  };

  return (
    <StyledMenu
      role="listbox"
      style={{
        ...getVariantStyle(),
        ...style,
      }}
    >
      {children}
    </StyledMenu>
  );
};

const StyledMenu = styled.ul`
  position: absolute;
  padding: 4px;
  list-style: none;
  border-radius: ${radius.borderRadiusMd};
  background-color: ${color.bgContainer};
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
