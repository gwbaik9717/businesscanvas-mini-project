import React, { useEffect } from "react";
import { useSelectContext } from "./Select";
import styled from "styled-components";
import {
  color,
  padding,
  transition,
  height,
  radius,
} from "../../styles/theme/theme";

interface SelectMenuItemProps {
  value: React.Key;
  children?: React.ReactNode;
  style?: React.CSSProperties;
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
    <StyledMenuItem role="option" onClick={handleClick}>
      {children}
    </StyledMenuItem>
  );
};

const StyledMenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px ${padding.paddingMd};
  cursor: pointer;
  transition: ${transition.transition};
  width: 190px;
  height: ${height.heightMd};
  border-radius: ${radius.borderRadiusSm};

  &:hover {
    background-color: ${color.bgContainerHover};
  }
`;
