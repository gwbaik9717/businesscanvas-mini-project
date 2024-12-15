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
  selected?: boolean;
  style?: React.CSSProperties;
}

export const SelectMenuItem: React.FC<SelectMenuItemProps> = ({
  value,
  children,
  selected,
  style,
}) => {
  const { selectMenuItem, registerOption } = useSelectContext();

  useEffect(() => {
    registerOption({ value, label: String(children) });
  }, [value, children, registerOption]);

  const handleClick = () => {
    selectMenuItem(value);
  };

  return (
    <StyledMenuItem
      role="option"
      selected={selected}
      onClick={handleClick}
      style={style}
    >
      {children}
    </StyledMenuItem>
  );
};

const StyledMenuItem = styled.li<{
  selected?: boolean;
  style?: React.CSSProperties;
}>`
  display: flex;
  align-items: center;
  padding: 5px ${padding.paddingLg};
  cursor: pointer;
  transition: ${transition.transition};
  width: 100%;
  height: ${height.heightSm};
  border-radius: ${radius.borderRadiusSm};
  background-color: ${(props) =>
    props.selected ? color.bgActive : color.transparent};
  color: ${(props) => (props.selected ? color.primary : color.text)};

  &:hover {
    background-color: ${color.bgContainerHover};
  }
`;
