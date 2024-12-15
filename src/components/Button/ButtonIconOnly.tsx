import React from "react";
import { Button } from "./Button";
import styled from "styled-components";
import {
  color,
  fontSize,
  fontWeight,
  padding,
  radius,
  height,
} from "../../styles/theme/theme";

interface ButtonIconOnlyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export const ButtonIconOnly: React.FC<ButtonIconOnlyProps> = (props) => {
  return (
    <StyledButton as="button" {...props}>
      {props.children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${padding.paddingMd};
  font-weight: ${fontWeight.fontWeightBold};
  font-size: ${fontSize.fontSizeSm};
  border-radius: ${radius.borderRadiusSm};
  background-color: ${color.transparent};
  color: ${color.bgContainer};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: ${height.heightSm};

  &:hover {
    background-color: ${color.bgContainerHover};
  }

  &:active {
    background-color: ${color.bgContainerHover};
  }

  &:disabled {
    background-color: ${color.bgContainerHover};
    color: ${color.border};
    cursor: not-allowed;
  }
`;
