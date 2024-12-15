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
  value: any;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const SelectMenuItem: React.FC<SelectMenuItemProps> = ({
  value,
  children,
}) => {
  const { selectMenuItem, registerOption } = useSelectContext();

  useEffect(() => {
    registerOption({ value, label: String(children) });
  }, [value, children, registerOption]);

  const handleClick = () => {
    selectMenuItem(value);
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
  padding: 5px ${padding.paddingLg};
  cursor: pointer;
  transition: ${transition.transition};
  width: 190px;
  height: ${height.heightMd};
  border-radius: ${radius.borderRadiusSm};

  &:hover {
    background-color: ${color.bgContainerHover};
  }
`;
